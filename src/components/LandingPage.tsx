import NavBar from "./NavBar";
import CardCarousel from "./CardCarousel";
import { CardCarouselLanguage } from '../language/CardCarouselLanguage';

function LandingPage(){


    return (
        <>
            <NavBar items={[
                { label: "Home", link: "/" },
                { label: "About", link: "/about" },
                { label: "Contact", link: "/contact" },
                { label: "Ground", link: "/ground"}
            ]} />

            <h1>AES Explorer</h1>

            <div className="site-description-container">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero cumque tempore facilis nemo maxime molestiae! A ea laudantium nemo molestiae obcaecati! Dolorem minus nisi saepe at rem nostrum, reiciendis est.</p>
            </div>

            <h2>Features</h2>
            <CardCarousel items={CardCarouselLanguage.getCarouselItems('ES')}/>

            <div>
                <h2>Content</h2>

            </div>

            <div>
                <h2>Wanna know more information?</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus officiis quod, molestiae ea, ducimus soluta cumque, velit eum voluptates omnis pariatur? Dolorum aliquam asperiores voluptates nisi laboriosam veritatis ullam harum?</p>

                <ol>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                </ol>
            </div>
            <div>
                <h2>Wanna know more information?</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus officiis quod, molestiae ea, ducimus soluta cumque, velit eum voluptates omnis pariatur? Dolorum aliquam asperiores voluptates nisi laboriosam veritatis ullam harum?</p>

                <ol>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                </ol>
            </div>
            <div>
                <h2>Wanna know more information?</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus officiis quod, molestiae ea, ducimus soluta cumque, velit eum voluptates omnis pariatur? Dolorum aliquam asperiores voluptates nisi laboriosam veritatis ullam harum?</p>

                <ol>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                </ol>
            </div>
            <div>
                <h2>Wanna know more information?</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus officiis quod, molestiae ea, ducimus soluta cumque, velit eum voluptates omnis pariatur? Dolorum aliquam asperiores voluptates nisi laboriosam veritatis ullam harum?</p>

                <ol>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                    <li>Reference</li>
                </ol>
            </div>

        </>
    )
}

export default LandingPage;