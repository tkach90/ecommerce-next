import {
	ImageEdge,
	MoneyV2,
	Product as ShopifyProduct
} from "../schema";
import { Product } from "@common/types/product";


const normalizeProductImages = ({edges}: {edges: Array<ImageEdge>}) => {
	return  edges.map(({node: { originalSrc: url, ...rest}}) => {
		return {
			url: `/images/${url}`,
			...rest
		}
	})
}

const normalizeProductPrice = ({currencyCode, amount}: MoneyV2) => ({
	value: +amount,
	currencyCode
})

export function normalizeProduct(productNode: ShopifyProduct): Product {
	const {
		id,
		title: name,
		handle,
		vendor,
		description,
		images: imageCollection,
		priceRange,
		...rest
	} = productNode;

	const product = {
		id,
		name,
		vendor,
		description,
		path: `/${handle}`,
		slug: handle.replace(/ˆ\/+|\/+$/g, ""),
		images: normalizeProductImages(imageCollection),
		price: normalizeProductPrice(priceRange.minVariantPrice),
		...rest
	}

	return product;
}