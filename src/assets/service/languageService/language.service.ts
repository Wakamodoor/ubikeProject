import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
// import { SharedModule } from 'src/app/shared/shared.module';



@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language$ = new ReplaySubject;
  translate = this.translateService;

  // 國旗對照
  countryMap = new Map().set('en', 'flag-us').set('zh-tw', 'flag-tw');

  constructor(private translateService: TranslateService) {}

  setInitState() {
    // this.translateService.setDefaultLang('zh-tw')
    this.translateService.use('zh-tw');
    console.log(this.translateService.currentLang)
    // this.translateService.addLangs(['en', 'zh-tw']);
    // // 根據使用者的瀏覽器語言設定，如果是中文就顯示中文，否則都顯示英文
    // // 繁體/簡體中文代碼都是zh
    // const browserLang = (this.translate.getBrowserLang().includes('zh')) ? 'zh-tw' : 'en'  ;
    // this.setLang(browserLang);
  }

  // setLang(lang: string) {
  //   this.translateService.onLangChange.subscribe(result => {
  //     this.language$.next(result.lang);
  //   });
  //   this.translateService.use(lang);
  // }

  getCurrentLang() {
    return this.translateService.currentLang
  }
}
