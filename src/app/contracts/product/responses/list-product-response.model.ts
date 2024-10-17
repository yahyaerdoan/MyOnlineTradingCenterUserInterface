import { FunctionResponse } from "../../responses/functionResponse";
import { Product } from "../models/product.model";

export class ListProductResponse extends FunctionResponse<Product[]> {
}
