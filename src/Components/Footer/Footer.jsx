import style from './Footer.module.scss'
import facebookIcon from '../../assets/icons/SoMe/Facebook.png'

export function Footer() {

    return (
        <footer className={style.footerStyle}>
            <section>
                <h3>For Jobsøgere</h3>
                <br />
                <p>Din kundeside</p>
                <p>Opret Profil</p>
                <p>Gemte jobs</p>
            </section>

            <section>
                <h3>For Arbejdsgiver</h3>
                <br />
                <p>Virksomhedsprofil</p>
                <p>Opret Annonce</p>
                <p>Jobannoncering</p>
                <p>Rekruttering</p>
            </section>

            <section>
                <h3>Links</h3>
                <br />
                <p>Om Gratissimo</p>
                <p>Job hos os</p>
                <p>For investorer</p>
                <p>Presse</p>
            </section>

            <section>
                <h4>Vil du have jobs direkte i din indbakke</h4>
                <p>Tilmeld dig vores elektroniske nyhedsbrev</p>

                <form>
                    <input type="email" placeholder="Email" />
                    <input type="submit" value="Tilmeld" />
                </form>
            </section>


            <section>
                <p>Fidusvej 23</p>
                <p>9230 Øster Lundby</p>
                <p>+45 22 13 22 13</p>
                <img src={facebookIcon} alt="Facebook" />
            </section>

        </footer>
    )
}