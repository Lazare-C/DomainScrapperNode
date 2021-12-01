import axios from 'axios';
import { domainScrapper, domainNs } from './domainScrapper';
import {domain } from './class/domain';
import look from './whoisScrapper';
import fs from "fs";

interface WhoIsResult {
    domainName: string;
    updatedDate?: string | undefined;
    creationDate?: string | undefined;
    expirationDate?: string | undefined;
    registrar?: string | undefined;
    status?: string[] | undefined;
    isAvailable: boolean;
}

let blacklistdomain: string[]= ['free.fr', 'canalblog.com', 'blogspot.fr', 'over-blog.com', 'free.fr', 'boosterblog.com', 'orange.fr', 'com.br', 'co.uk', 'blogspot.com', 'gouv.fr', 'goov.uk', 'qc.ca', 'asso.fr', 'com.pl']

let domainList: domain[] = [];

async function whoisSearch(dom: string) : Promise<any>{ 
    let tld = new domain(domain.extractDomain(dom))

    try{
     await domainNs(tld.domain);
     tld.isFree = false
      console.log("NS TROUVE");
      
    }catch(error){

      let dataWhois = await look(tld.domain);
      if(dataWhois.isAvailable === true){
        tld.isFree = true;
        if(domain.spamDomain(tld.domain)){
          tld.isSpam = true;
          try {
            fs.writeFileSync('spam.txt', tld.domain + '\n', { flag: 'a+' })
          } catch (err) {
            console.error(err)
            }
          }else{
          try {
            fs.writeFileSync('free.txt', tld.domain + '\n', { flag: 'a+' })
          } catch (err) {
            console.error(err)
          }
        }
      }else{ 
          tld.isFree = false;
          if(dataWhois.expirationDate) tld.expirationDate = new Date(dataWhois.expirationDate) 
      }
    
      console.log((tld.isFree? "FREE" : "PAYANT")+ ": " +  tld.domain)
      return tld;
  




      
    }


}

   async function search(keyword: string) : Promise<void>{ 
    try{
    let res :any = await domainScrapper(keyword)
    
    console.log("le mot clé: " + keyword + "a trouvé " + res.length + " domaines ex:");
    for(let i= 0; i < res.length; i++){
      let x = 10;
      let pass = false
      do {
        let element: { display_name: string; } = res[i];
        try {
          let checkDomain: boolean = false;
          domainList.forEach(ellist => {
            if(ellist.domain == domain.extractDomain(element.display_name)){
                checkDomain = true;
            }})
          if(!blacklistdomain.includes(domain.extractDomain(element.display_name)) && checkDomain == false){
            let tld =  await whoisSearch(element.display_name);
            if(tld) domainList.push(tld);
           }
           pass = true;
        } catch (error : unknown) {
          if (error instanceof Error && error.message === 'Rate Limited') {
          console.log(domain.extractDomain(element.display_name) + ": erreur: " + error.message);
          x++;
             await sleep(x*1000);
             if(x >= 15) pass = true;  
        }else{
          pass = true;
        }
        }
      } while (!pass);
    }   
  }catch(error){
   // console.log(error);
  }
  return void 0;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main(){
let listkeyword: string[]= []

 fs.readFile('keywords.txt', 'utf8', async (err, data) => {
  if (err) throw err;
  data.split(/\r?\n|,/).forEach((element: string) => listkeyword.push(element));
  console.log(listkeyword);
for(let x= 0;  x < listkeyword.length; x++){
  try {
    console.log("recherche du keyword: " + listkeyword[x]);
    await search(listkeyword[x]);
    console.log("fin de la recherche du keyword: " + listkeyword[x] + " fini!");
  } catch (error) {
    console.log(error); 
  }
}
console.log("Recherches des mots clés fini!");
})
}
main();