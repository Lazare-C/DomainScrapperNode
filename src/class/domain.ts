export class domain {

    private _domain: string;

    private _isFree: boolean | undefined;

    private _expirationDate: Date | undefined;
    
    private _isSpam: boolean = false;

    constructor(domain: string) {
        this._domain = domain;
    }
    public get domain(): string {
        return this._domain;
    }
    public set domain(value: string) {
        this._domain = value;
    }
    public get isFree(): boolean | undefined {
        return this._isFree;
    }
    public set isFree(value: boolean | undefined) {
        this._isFree = value;
    }
    public get expirationDate(): Date | undefined {
        return this._expirationDate;
    }
    public set expirationDate(value: Date | undefined) {
        this._expirationDate = value;
    }
    public get isSpam(): boolean {
        return this._isSpam;
    }
    public set isSpam(value: boolean) {
        this._isSpam = value;
    }

    static extractDomain(url: string): string {
        return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "$1");
    }

    static spamDomain(domain: string): boolean {
        if(/^[0-9]*[a-z]+[0-9]+[a-z]+[0-9]*/.test(domain)){
            return true;
        }else{
            return false;
        }
    }
}
