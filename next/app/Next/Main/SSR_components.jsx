import Product from "./product";

export const Thumbnail = ({url})=>  <div className="image_window">
                                        <img className="product_image" src={url} alt=""/>
                                    </div>;

export const Category = ({is}) =>   <div className="product_type">
                                        <small>{is}</small>
                                    </div>;

export const Title = ({is})=>   <div className="product_title">
                                    <h5>{is}</h5>
                                </div>;

export const Price = ({is})=>   <div className="product_price">
                                    <p>${is}</p>
                                </div>;

export const AddedQuantity = ({quantity})=> <div className="quantity">
                                                 <div className="quantity-holder">{quantity}</div>
                                            </div>;

export function Header({text}){
    return  <div className="window1">
                <h1 className="headerText">{text}</h1>
            </div>;
}

export function Window1(){
    return  <div className="window1">
                <Header text='Desserts'/>
            </div>;
};

function CarbonNote(){
    return  <>
                <div className="CarbonNote">
                    <div className="carbon-icon">
                        <img src="/images/icon-carbon-neutral.svg" alt="C"/><span className="carbon-text">This is a<span className="highlight"> carbon-neutral</span> delivery</span>
                    </div>
                </div>
            </>
}

export function AddedProducts({ products }) {
    return <div id="added-products" className="added-products">{products}</div>;
}

export function CartHeader({quantity}){
    const headerText = quantity ? <h3>Your Cart (<span id="exact-total">{quantity}</span>)</h3> : <h3>No Products Yet.</h3>;
    return  <>
                <div id="total" className="total">
                    {headerText}
                </div>
            </>;
};

const getProcessedProducts = (products, keyList) => {
    return keyList.map(id => {
        const product = products[id];
        return product ? {
            id: product.id,
            title: product.title,
            price: product.price,
            type: product.type,
            image: product.image
        } : null;
    }).filter(Boolean);
};

export function ProductsList({ products }) {
    const productsKeyList = Object.keys(products);
    const processedProducts = getProcessedProducts(products, productsKeyList);
    
    return (
        <div id="products-hub" className="products_window">
            {processedProducts.map(({ id, title, price, type, image }) => (
                <Product key={id} id={id} title={title} price={price} type={type} image={image} />
            ))}
        </div>
    );
}

export function CartPanel({TotalIndicator}){
    const structure = 
        <div className="order-total">
            <div className="TotalIndicator">
                <p>Order Total</p>
            </div>
            <TotalIndicator/>
            <CarbonNote/>
        </div>;
    return structure;
};