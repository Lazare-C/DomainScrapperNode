import axios from 'axios';
import dns from 'dns';
export function domainScrapper(keyword: string) {

    return new Promise((resolve :any, reject :any) => {
        axios.get(`https://web.archive.org/__wb/search/anchor?q=${encodeURI(keyword)}`, {timeout: 1000000}).then(((data:any) => resolve(data.data)), ((err:any) => reject(err)));
    });   
}
export function domainNs(domain: string) :  any  {
    return new Promise((resolve :any, reject :any) => {

    dns.resolve4(domain, (err, addresses) => {
        if (err){
            reject(err);
            return;
        } 
        if(addresses){
            resolve(addresses);
            return;
        }
    });
}
    )
}

