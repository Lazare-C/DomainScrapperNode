import axios from 'axios';
export function domainScrapper(keyword: string) {

    return new Promise((resolve :any, reject :any) => {
        axios.get(`https://web.archive.org/__wb/search/anchor?q=${keyword}`).then(data => resolve(data.data)).catch(reject);

    });   
}