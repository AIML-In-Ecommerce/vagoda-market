import {
  BannerElement,
  BannerPatternType,
  CategoryElement,
  CategoryPatternType,
  CollectionElement,
  CollectionPatternType,
  ProductElement,
  ProductPatternType,
  PromotionElement,
  PromotionPatternType,
  WidgetCategoryType,
  WidgetType,
} from "@/model/WidgetType";
import BannerCarousel from "./boothPattern/BannerCarousel";
import ProductCarousel from "./boothPattern/ProductCarousel";
import ProductGrid from "./boothPattern/ProductGrid";
import PromotionGrid from "./boothPattern/PromotionGrid";
import CategoryGrid from "./boothPattern/CategoryGrid";
import CollectionGrid from "./boothPattern/CollectionGrid";
import CollectionCarousel from "./boothPattern/CollectionCarousel";
import { ReactElement } from "react";

interface WidgetListProps {
  widgets: WidgetType[];
  setCollectionId: (id: string) => void;
  setTab1: () => void;
  notify(message: string, content: ReactElement): void;
}

export default function WidgetList(props: WidgetListProps) {
  return (
    <div>
      {props.widgets
        .sort((a, b) => a.order - b.order)
        .map((item, index) => (
          <div key={index}>
            {item.visibility && (
              <Widget
                widget={item}
                setCollectionId={props.setCollectionId}
                setTab1={props.setTab1}
                notify={props.notify}
              />
            )}
          </div>
        ))}
    </div>
  );
}

interface BaseWidgetProps {
  widget: WidgetType;
  setCollectionId: (id: string) => void;
  setTab1: () => void;
  notify(message: string, content: ReactElement): void;
}

// filtering types
function Widget(props: BaseWidgetProps) {
  return (
    <div>
      {props.widget.type === WidgetCategoryType.BANNER && (
        <BannerWidget widget={props.widget} notify={props.notify} />
      )}

      {props.widget.type === WidgetCategoryType.PRODUCT && (
        <ProductWidget widget={props.widget} notify={props.notify} />
      )}

      {props.widget.type === WidgetCategoryType.CATEGORY && (
        <CategoryWidget widget={props.widget} setTab1={props.setTab1} />
      )}

      {props.widget.type === WidgetCategoryType.PROMOTION && (
        <PromotionWidget widget={props.widget} notify={props.notify} />
      )}

      {props.widget.type === WidgetCategoryType.COLLECTION && (
        <CollectionWidget
          widget={props.widget}
          setCollectionId={props.setCollectionId}
        />
      )}
    </div>
  );
}

interface WidgetProps {
  widget: WidgetType;
  notify(message: string, content: ReactElement): void;
}

function ProductWidget(props: WidgetProps) {
  const element = props.widget.element as ProductElement;

  return (
    <div>
      {element && element.pattern === ProductPatternType.CAROUSEL && (
        <ProductCarousel widget={props.widget} notify={props.notify} />
      )}
      {element && element.pattern === ProductPatternType.GRID && (
        <ProductGrid widget={props.widget} notify={props.notify} />
      )}
    </div>
  );
}

function BannerWidget(props: WidgetProps) {
  const element = props.widget.element as BannerElement;

  return (
    <div>
      {element && element.pattern === BannerPatternType.CAROUSEL && (
        <BannerCarousel widget={props.widget} />
      )}
    </div>
  );
}

interface CategoryWidgetProps {
  widget: WidgetType;
  setTab1: () => void;
}

function CategoryWidget(props: CategoryWidgetProps) {
  const element = props.widget.element as CategoryElement;

  return (
    <div>
      {element && element.pattern === CategoryPatternType.GRID && (
        <CategoryGrid widget={props.widget} setTab1={props.setTab1} />
      )}
    </div>
  );
}

function PromotionWidget(props: WidgetProps) {
  const element = props.widget.element as PromotionElement;

  return (
    <div>
      {element && element.pattern === PromotionPatternType.GRID && (
        <PromotionGrid widget={props.widget} />
      )}
    </div>
  );
}

interface CollectionWidgetProps {
  widget: WidgetType;
  setCollectionId: (id: string) => void;
}

function CollectionWidget(props: CollectionWidgetProps) {
  const element = props.widget.element as CollectionElement;

  return (
    <div>
      {element && element.pattern === CollectionPatternType.GRID && (
        <CollectionGrid
          widget={props.widget}
          setCollectionId={props.setCollectionId}
        />
      )}

      {element && element.pattern === CollectionPatternType.CAROUSEL && (
        <CollectionCarousel
          widget={props.widget}
          setCollectionId={props.setCollectionId}
        />
      )}
    </div>
  );
}

// const MockData = [
//   {
//     _id: "sp-01",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-02",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell Vostro",
//     rating: 4.5,
//     soldAmount: 32,
//     price: 17000000,
//     flashSale: false,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-03",
//     imageLink:
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell SuperLight",
//     rating: 4.5,
//     soldAmount: 10,
//     price: 22000000,
//     flashSale: true,
//     originalPrice: 20000000,
//     category: "",
//   },
//   {
//     _id: "sp-04",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-05",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell Vostro",
//     rating: 4.5,
//     soldAmount: 32,
//     price: 17000000,
//     flashSale: false,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-06",
//     imageLink:
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell SuperLight",
//     rating: 4.5,
//     soldAmount: 10,
//     price: 22000000,
//     flashSale: true,
//     originalPrice: 20000000,
//     category: "",
//   },
//   {
//     _id: "sp-07",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-08",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell Vostro",
//     rating: 4.5,
//     soldAmount: 32,
//     price: 17000000,
//     flashSale: false,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-09",
//     imageLink:
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell SuperLight",
//     rating: 4.5,
//     soldAmount: 10,
//     price: 22000000,
//     flashSale: true,
//     originalPrice: 20000000,
//     category: "",
//   },
//   {
//     _id: "sp-10",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-11",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell Vostro",
//     rating: 4.5,
//     soldAmount: 32,
//     price: 17000000,
//     flashSale: false,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-12",
//     imageLink:
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell SuperLight",
//     rating: 4.5,
//     soldAmount: 10,
//     price: 22000000,
//     flashSale: true,
//     originalPrice: 20000000,
//     category: "",
//   },
// ];
