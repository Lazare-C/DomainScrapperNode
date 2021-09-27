import axios from 'axios';
import { domainScrapper } from './domainScrapper';
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


let blacklistdomain: string[]= ['free.fr', 'canalblog.com', 'blogspot.fr', 'over-blog.com', 'free.fr', 'boosterblog.com', 'orange.fr', 'com.br']

let domainList: domain[] = [];

function search(keyword: string){ domainScrapper(keyword).then((res : any ) => {


  res.forEach((element: { display_name: string; }) => {

 
  //      console.log(domainList.filter(item => item.domain == domain.extractDomain(element.display_name)));
    

    if(blacklistdomain.includes(domain.extractDomain(element.display_name))){


        console.log("pass");
        

    }else{


      let tld = new domain(domain.extractDomain(element.display_name))

       look(tld.domain).then((data : WhoIsResult) =>{
        if(data.isAvailable == true){
            tld.isFree = true;
            try {
              const data = fs.writeFileSync('free.txt', tld.domain + '\n', { flag: 'a+' })
            } catch (err) {
              console.error(err)
            }

        }else{ 
            tld.isFree = false;
            if(data.expirationDate) tld.expirationDate = new Date(data.expirationDate) 
        }
        console.log((tld.isFree? "FREE" : "PAYANT")+ ": " +  tld.domain);
        domainList.push(tld); 
       })
    }
   });    
})
}
 function main(){


//search("lance-pierre");
let listkeyword: string[]= []

 fs.readFile('keywords.txt', 'utf8', (err, data) => {
  if (err) throw err;
  data.split(/\r?\n|,/).forEach((element: string) => listkeyword.push(element));
  console.log(listkeyword);



listkeyword.forEach(item =>{

search(item)

})
})

// domainList.forEach((element: domain) => {
//     if(element.isFree){
//         console.log(element.domain + " is free");
//     }
// });
}

main();