import Image from 'next/image'
import '../../../public/css/home.css';
import SecondayImage from '../../../public/images/past-section.jpg'
import '../../../public/css/bootstrap.min.css'

export function addStylesheet(href) {
    if (typeof window !== "undefined") {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    }
}

function MainView({image_url}){
    const Descriptionstyle = {
        backgroundImage: `url(${image_url})`,
        backgroundPosition: "top right",
        backgroundRepeat: "no-repeat",
    }
    return  <div style={Descriptionstyle} className="container-fluid bg-primary py-5 mb-5 main-header">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="font-secondary text-primary mb-4">Ташкентский стиль</h1>
                            <h1 className="display-1 text-uppercase text-white mb-4">CakeBase</h1>
                            <h1 className="text-uppercase text-white">Лучшие торты в Ташкенте</h1>
                            <RedirectionButton path="Main/"/>
                        </div>
                    </div>
                </div>
            </div>
};

const RedirectionButton = ({path})=>    <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                                            <a href={path} style={{color:'white', zIndex:1}} className="btn btn-primary border-inner py-3 px-5 me-5 mainbutton">Пж, Cюда!</a>
                                            <span className="ButtonGround"></span>
                                        </div>;

const MainContentHeader = ()=>  <div className="section-title position-relative text-center mx-auto mb-5 pb-3" style={{maxWidth: '600px'}}>
                                    <h2 className="text-primary font-secondary">Об Этом</h2>
                                    <h1 className="display-4 text-uppercase">Вы видите приложение Next JS!</h1>
                                </div>;

const HeadLine = ({text})=> <h4 className="text-uppercase">{text}</h4>;

const FontAwesomeFrame = ({icon})=> 
    <>
        <div className="d-flex align-items-center justify-content-center bg-primary border-inner mb-4" style={{width: '90px', height: '90px'}}>
            <i className={`fa fa-${icon} fa-2x text-white`}></i>
        </div>
    </>;

const SideDescription = ({description, headline, icon, list})=>{
    const lists = list ? list.map((each, id)=><ul key={id}>{each}</ul>) : [];
    return  <>
                <div className="col-sm-6">
                    <FontAwesomeFrame icon={icon}/>
                    <HeadLine text={headline}/>
                    <p className="mb-0">{description}</p>
                    {lists.length ? <>
                                        <br/>
                                        {lists}
                                    </> :  ''}
                </div>
            </>
    }

const ContentDescription = ({type:TagName, size, content, comps})=> <TagName className={`mb-${size}`}>{content} {comps ? comps : ''}</TagName>


const QickUrl =  (url, text, id) => <a key={id} href={`/${url}`}>{text}</a>

function MainContent(){
    return  <div className="container-fluid pt-5">
                <div className="container">
                    <MainContentHeader/>
                    <div id="DownBelowContent">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{minHeight: '400px'}}>
                            <div className="position-relative h-100">
                                <Image className="DownImage" src={SecondayImage}  alt="desert"/>
                            </div>
                        </div>
                        <div className="col-lg-6 pb-5">
                            <ContentDescription type='h4' size='4' content="Это веб-приложение написанное на Next JS, Redux, App Router."/>
                            <ContentDescription 
                                type='p' 
                                size='5' 
                                comps={[QickUrl('Vanilla/Home/', 'Vanilla, ', 1), QickUrl('React/Home/', 'Vite/React, ', 2), QickUrl('Next/Home/', 'NextJS', 3)]} 
                                content={`Это веб-приложения Мансура, тот же проект с версиями`}
                            />                            
                            <div className="row g-5">
                                <SideDescription 
                                    description='Один и тот же веб-приложение, но реализованное тремя разными способами ↓'
                                    headline='100% Oдинаковое'
                                    icon='heartbeat'
                                    list={['Vanilla JS', 'React (Vite/React)', 'Next.js']}
                                />
                                <SideDescription 
                                    description='Nginx используется как Proxy-Server для всех версий с кэшированием запросов и deployed на AWS.'
                                    headline='Nginx + SSR'
                                    icon='award'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export function HomeContent(){
    return  <>  
                <MainView image_url='/images/main.jpg'/>
                <MainContent/>
            </>
};