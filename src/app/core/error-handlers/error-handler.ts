import { ErrorHandler, Injectable } from '@angular/core';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    handleError() {
        console.log('error');
        
    }

}