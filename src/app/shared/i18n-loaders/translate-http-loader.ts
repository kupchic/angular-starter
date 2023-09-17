import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function NgxTranslateHttpLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http); // here path to translates might be changed
}
