import type { InferGetStaticPropsType} from "next";
import { getAllProducts } from "@framework/product";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero, Marquee } from "@components/ui";


export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts(config);

  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60
  }
}

export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
      <>
          <Grid>
              { products.slice(0,3).map(product =>
                  <ProductCard
                      key={product.id}
                      product={product}
                  />
              )}
          </Grid>
          <Hero
            headline="Cookies, ice cream and muffin"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium dicta dolore eaque esse fugit, ipsum iure
            iusto laboriosam magni officiis perferendis quibusdam recusandae reprehenderit saepe temporibus ut velit,
            voluptatum."
          />
          <Marquee>
              { products.slice(0,3).map(product =>
                  <ProductCard
                      key={product.id}
                      product={product}
                      variant="slim"
                  />
              )}
          </Marquee>
          <Grid layout="B">
              { products.slice(0,3).map(product =>
                  <ProductCard
                      key={product.id}
                      product={product}
                  />
              )}
          </Grid>
          <Marquee variant="secondary">
              { products.slice(0,3).map(product =>
                  <ProductCard
                      key={product.id}
                      product={product}
                      variant="slim"
                  />
              )}
          </Marquee>
    </>
  )
}

Home.Layout = Layout;