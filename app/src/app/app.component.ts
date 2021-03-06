import { Component, ViewChild} from '@angular/core';
import { Platform,ViewController, MenuController, NavController, App, ModalController,Events, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Auth } from '../providers/auth';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilPage} from '../pages/profil/profil';
import { GantipaswordPage} from '../pages/gantipasword/gantipasword';
import { UndanganPage } from '../pages/undangan/undangan';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Profil', name: 'Tabs', component: TabsPage, tabComponent: ProfilPage, index: 0, icon: 'people' },
    { title: 'Ganti Password', name: 'Tabs', component: TabsPage, tabComponent: GantipaswordPage, index: 1, icon: 'key' },
    { title: 'Logout', name: 'Tabs', component: TabsPage, tabComponent: LoginPage, index: 2, icon: 'log-out',logsOut: true },
  ];

  constructor(
    platform: Platform,     
    public events: Events,
    public menu: MenuController,
    public storage: Storage,
    public app: App,
    public auth: Auth) {
        platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
    }

    openPage(page: PageInterface) {
      let params = {};

      if (page.index) {
        params = { tabIndex: page.index };
      }

      if (this.nav.getActiveChildNav() && page.index != undefined) {
          this.nav.getActiveChildNav().select(page.index);
        // Set the root of the nav with params if it's a tab index
      } else {
          this.nav.setRoot(page.name, params).catch((err: any) => {
            console.log(`Didn't set nav root: ${err}`);
          });
      }


      if (page.logsOut === true) {
       // this.auth.logout();
        const root = this.app.getRootNav();
        root.popToRoot(LoginPage);
      }
  }
}