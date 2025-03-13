import Product from "./product"
import '../assets/css/messages.css'
import '../assets/css/animations.css'
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const server_response = JSON.parse(import.meta.env.server_response);

const project_repo = 'https://github.com/CoolerWithHeat/';

function Header({text}){
    return  <div className="window1">
                <h1 className="headerText">{text}</h1>
            </div>;
}

function openURL(url) {
    if (url && typeof url === 'string') {
        setTimeout(() => {
          window.open(url, '_blank');
        }, 599);
    } else {
        console.error('Invalid URL provided');
    }
}

const removePopup = (elementRef) => {
    if (elementRef?.current) {
        elementRef.current.classList.remove("message-request");
        elementRef.current.classList.add("removeSuggestion");
    }
};

function SourceCodePopup(){
    const visitorIneraction = useSelector((state) => state.interaction);
    const [suggestionActive, removeSuggestion] = useState(true);
    const rejectRef = useRef(null)
    const openGitRepo = ()=>{
        removePopup(rejectRef)
        setTimeout(() => {
            openURL(project_repo);
        }, 299);
    };
    return ((visitorIneraction > 3) && (suggestionActive)) ? <div ref={rejectRef} id="SourceSuggestion" className="message-request">
                <div className="message-header">
                <h1 className="headerText">Attention!</h1>
                </div>
                <div className="request">
                <div className="requestHeader">
                    <h4>Want To See Source Code?</h4>
                </div>
                <div className="requestActions">
                    <div onClick={openGitRepo} id="YesPoint" className="Yes">Yes</div>
                    <div onClick={() => removePopup(rejectRef)} id="NoPoint" className="No">No</div>
                </div>
                </div>
            </div>
        :
        <></>
};

function ConfirmButton({enableMessage, action, animate, quantity}){
    const buttonRef = useRef(null);
    useEffect(() => {
        if (buttonRef.current && quantity && animate) {
          buttonRef.current.classList.remove("bubble-button");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              buttonRef.current.classList.add("bubble-button");
            });
          });
          action();
          enableMessage();
        };
      }, [animate]);
    return  <div onClick={action} className="confirmation">
                <div ref={buttonRef} id="ConfirmButton" className={`confirm-button`}>
                <p>Confirm Order</p>
                </div>
            </div>;
}

function Window1(){
    return  <div className="window1">
                <Header text='Desserts'/>
            </div>;
};

function PurchaseSuccess({text, removeMessage}){
    useEffect(()=>{
        const timeoutID = setTimeout(() => {
            removeMessage();
        }, 3999);
        return () => clearTimeout(timeoutID);
    }, []);
    return  <div className="message-positive rightSideAppear">
                <div className="message-header">
                <h1 className="headerText">Thank You!</h1>
                </div>
                <div className="message-lifespan"></div>
                <div className="textContainer">
                <p className="message-text">
                    {text}
                </p>
                </div>
            </div>
};

function TotalIndicator() {
    const last = useSelector((state) => state.lastResulted);
    const current = useSelector((state) => state.total);
    const [currentValue, updateValue] = useState(last); 
    useEffect(() => {
        if (currentValue === current) return;
        let step = currentValue < current ? 1 : -1;
        let interval = setInterval(() => {
            updateValue((prev) => {
                let nextValue = prev + step;
                if ((step > 0 && nextValue >= current) || (step < 0 && nextValue <= current)) {
                    clearInterval(interval);
                    return current;
                }
                return nextValue;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [current]);
    return (
        <div className="TotalPrice">
            <p id="Exact-Amount">${currentValue}</p>
        </div>
    );
}


const CarbonNote = ()=> <div className="CarbonNote">
                            <div className="carbon-icon">
                                <img src="/assets/images/icon-carbon-neutral.svg" alt="C"/><span className="carbon-text">This is a<span className="highlight"> carbon-neutral</span> delivery</span>
                            </div>
                        </div>;

const CompleteRemoval = (id, dispatch)=> {
    dispatch({ type: 'Complete_Removal', payload: id })
};

const UpdateLastTotal = (total, dispatch)=> {
    dispatch({ type: 'Total_Update', payload: total })
};

const calculateTotal = (addedProducts)=>{
    const keys = Object.keys(addedProducts);
    let totalResulted = 0;
    keys.forEach(each_key=>{
        const product = server_response[each_key];
        if (product){
            let price = product.price;
            try{ price=parseFloat(price) } catch{};
            const quantity = addedProducts[each_key].quantity;
            const NumberPrice = typeof price === 'number';
            const NumberQuantity = typeof quantity === 'number';
            if ((NumberPrice) && (NumberQuantity)){
                totalResulted += (price*quantity);
            }
        };
    });
    return totalResulted;
};

function CartPanel(){
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

function AddedProducts({products}){
    const structure = 
        <div id="added-products" className="added-products">
            {products}
        </div>;
    return structure;
};

function CartHeader({quantity}){
    const headerText = quantity ? <h3>Your Cart (<span id="exact-total">{quantity}</span>)</h3> : <h3>No Products Yet.</h3>;
    return  <>
                <div id="total" className="total">
                    {headerText}
                </div>
            </>;
};

function CartProduct({id, title, price, quantity, last_operation, clickAction}){
    const firstTime = (quantity === 1) && (last_operation == 'increment');
    const [modifyEffectClass, setModifyEffectClass] = useState(false);
    const [removeEffect, setRemoveEffect] = useState(false);
    const [removeElement, setRemoveElement] = useState(false);
    const firstTimeAnim = firstTime ? 'animate-card' : '';
    const modifyEffect = modifyEffectClass ? 'cart-update-effect' : '';
    const SlowlyRemove = removeEffect ? 'slowlyRemove' : '';
    useEffect(() => {
        if (!firstTime && quantity) {
            setModifyEffectClass(true);
            const timeout = setTimeout(() => {
                setModifyEffectClass(false);
            }, 399);
            return () => clearTimeout(timeout);
        } else if (quantity === 0){
            setRemoveEffect(true);
            const timout_id = setTimeout(() => {
                setRemoveElement(true);
            }, 449);
            return ()=> clearTimeout(timout_id);
        };
    }, [quantity, firstTime]);
    const cardClassname = `cart-product ${firstTimeAnim} ${modifyEffect} ${SlowlyRemove}`;
    return !removeElement ? (    
        <>
            <div id={`cart-product-${id}`} className={`cart-product ${cardClassname}`}>
                <div className="cart-product-child1">
                    <small>{title}</small>
                </div>
                <div className="cart-product-child2">
                    <p className="x-amount globaltext">{quantity}x</p>
                </div>
                <div className="cart-product-child3">
                    <p className="price1 globaltext">@ ${parseFloat(price).toFixed(2)}</p>
                </div>
                <div className="cart-product-child4">
                    <p className="price2 globaltext">${parseFloat(price * quantity).toFixed(2)}</p>
                </div>
                <div onClick={clickAction} className="cart-product-child5">
                    <img src="/assets/images/icon-remove-item.svg"/>
                </div>
            </div>
        </>
    ) : null;
};

function FilterExisting(dataset){
    if(dataset){
      const filteredData = Object.keys(dataset).filter(each=>{return dataset[each].quantity});
      return filteredData;
    }  
    return [];
};

function WrapCartProducts(data, dispatch, productState){
    const processed = data.map(each_id=>{
        const product = server_response[each_id];
        const product_data = productState[each_id] || {};
        const product_quantity = product_data['quantity'] || 0;
        const last_operation = product_data['last_operation'];
        const isObject = typeof product == 'object';
        if (isObject) {
            return (
                <CartProduct
                    key={`${each_id}-${product_quantity}`}
                    id={each_id}
                    title={product.title}
                    price={product.price}
                    quantity={product_quantity}
                    last_operation={last_operation}
                    clickAction={()=>CompleteRemoval(each_id, dispatch)}
                />
            );
        };
    });
    return processed;
};

function Window2({toggleState, updateToggle, enableMessage}){
    const productState = useSelector((state) => state.added_products);
    const keys = Object.keys((productState || {}));
    const [messageState, updateMessage] = useState(false);
    const dispatch = useDispatch();
    const products_count = FilterExisting(productState).length;
    const processedCartProducts = WrapCartProducts(keys, dispatch, productState);
    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const onDesktop = currentWidth > 659;
            if(onDesktop && !toggleState){updateToggle(true)};
        };
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener('resize', handleResize)
    }, [toggleState]);
    const structure = 
        <div className="window2">
            <div id="mobileCart" className={`Cart-Total mobileCart ${!toggleState ? 'closeMobileCart' : ''}`}>
                <CartHeader quantity={products_count}/>
                <AddedProducts products={processedCartProducts}/>
                <CartPanel/>
                <ConfirmButton enableMessage={enableMessage} action={()=>updateMessage(!messageState)} animate={messageState} quantity={products_count}/>
            </div>
        </div>;
    return structure;
};

function MobileToggle({toggleState, updateToggle}){
    return  <div onClick={()=>updateToggle(!toggleState)} id="togglePoint" className={`menu-button ${toggleState ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>;
};

const getProcessedProducts = (products, key_list)=>{
    if(key_list.length){
            const processedProducts = key_list.map(each_id=>{
            const identified_product = products[each_id];
            if(identified_product){
                const id = identified_product.id;
                const title = identified_product.title;
                const price = identified_product.price;
                const type = identified_product.type;
                const image = identified_product.image;
                return <Product key={id} id={id} title={title} price={price} type={type} image={image}/>;
            };
        })
        return processedProducts;
    };
    return [];
};

function ProductsList({products}){
    const products_key_list = Object.keys(products);
    const processedProducts = products_key_list.length ? getProcessedProducts(products, products_key_list) : [];
    const structure = 
        <div id="products-hub" className="products_window">
            {processedProducts}
        </div>;
    return structure;
};

function Main_interface(){
    const [messageOn, updateMessage] = useState(false);
    const [toggled, updateToggle] = useState(true)
    const toggleCartMobile = ()=>updateToggle(!toggled);
    const disableMessage = ()=> updateMessage(false);
    const enableMessage = ()=> updateMessage(true);
    useEffect(()=>{
        import('../assets/css/styles.css')
    }, []);
    const view_structure = 
        <>
            <div className="container">
                <Window1/>
                <MobileToggle toggleState={toggled} updateToggle={toggleCartMobile}/>
                <Window2 toggleState={toggled} updateToggle={toggleCartMobile} enableMessage={enableMessage}/>
                <ProductsList products={server_response}/>
            </div>
            <div id="SuggestionWindow"></div>
            <div id="MessageWindow">
                {messageOn ? <PurchaseSuccess removeMessage={disableMessage} text={"We're truly grateful for your support and trust in our products."}/> : ''}
                <SourceCodePopup/>
            </div>
        </>;
    return view_structure;
};

export default Main_interface;