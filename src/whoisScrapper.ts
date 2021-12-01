
import whois  from 'whois-parsed';


export default function look(url: string) : Promise<whois.WhoIsResult> {


	return new Promise((resolve :any, reject :any) => {
whois.lookup(url).then((data: whois.WhoIsResult) => resolve(data), (rej : any) => reject(rej));
	});
}