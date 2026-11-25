export class Product {
    public productId?: string;
    public productName?: string;
    public brandId?: string;
    public branchId?: string;

    constructor(productId: string, productName: string, brandId: string, branchId: string) {
        this.productId = productId;
        this.productName = productName;
        this.brandId = brandId;
        this.branchId = branchId;
    }
}

