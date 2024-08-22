
import SwalPlugin from '../sweetalert/sweetalert2'

let w = window;

export default class SweetAlert2 {
    constructor(Dcat) {
        // Ensure Dcat exists
        if (!Dcat) {
            console.error('Dcat object is required');
            return;
        }

        // Bind methods to this instance
        SwalPlugin.success = this.success.bind(this);
        SwalPlugin.error = this.error.bind(this);
        SwalPlugin.info = this.info.bind(this);
        SwalPlugin.warning = this.warning.bind(this);
        SwalPlugin.confirm = this.confirm.bind(this);
        console.log(SwalPlugin)
        // Assign SweetAlert2 instance
        w.swal = w.Swal = Dcat.swal = SwalPlugin;
        // Optionally assign confirm method to Dcat
        Dcat.confirm = SwalPlugin.confirm;
    }

    success(title, message, options) {
        return this.fire(title, message, 'success', options)
    }

    error(title, message, options) {
        return this.fire(title, message, 'error', options)
    }

    info(title, message, options) {
        return this.fire(title, message, 'info', options)
    }

    warning(title, message, options) {
        return this.fire(title, message, 'warning', options)
    }

    confirm(title, message, success, fail, options) {
        let lang = Dcat.lang;

        options = $.extend({
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: lang['confirm'],
            cancelButtonText: lang['cancel'],
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-white ml-1',
            buttonsStyling: false,
        }, options);

        this.fire(title, message, 'question', options).then(function (result) {
            if (result.value) {
                return success && success()
            }

            fail && fail()
        })
    }

    fire(title, message, type, options) {
        options = $.extend({
            title: title,
            type: type,
            html: message,
        }, options);

        return this.swal.fire(options);
    }
}
