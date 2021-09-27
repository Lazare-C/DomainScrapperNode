export class domain {

    private _domain: string;

    private _isFree: boolean | undefined;

    private _expirationDate: Date | undefined;


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

    static extractDomain(url: string): string {
        return url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?([^.\/]+\.[^.\/]+).*$/, "$1");
    }}