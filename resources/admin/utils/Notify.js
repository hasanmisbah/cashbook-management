import { ElNotification, ElMessageBox } from 'element-plus'

export default class Notify {

  static info = (message, title = 'Info') => {
    this.fireNotification({ title, message, type:"info" })
  }

  static success = (message, title = 'Success') => {
    this.fireNotification({ title, message, type:"success" })
  }

  static warning = (message, title = 'Warning') => {
    this.fireNotification({ title, message, type:"warning" })
  }

  static error = (message, title = 'Error') => {
    this.fireNotification({ title, message, type:"error" })
  }

  static fireNotification = ({ title, message, type }) => {

    ElNotification({
      title: title,
      message: message,
      type: type,
    })

  }

  static confirm = ({
                      message = 'Are you sure you want to delete',
                      title = 'Are you sure?',
                      confirmCv = null,
                      cancelCv = null,
                      config = null
                    }) => {
    this.showConfirm({ message, title, confirmCv, cancelCv })
  }

  static defaultConfirmationConfig = {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }

  static showConfirm = ({ message, title, confirmCv, cancelCv, config = null }) => {

    ElMessageBox
      .confirm(message, title, { ...this.defaultConfirmationConfig, ...config})
      .then(()=>{

        if(confirmCv instanceof Function){

          confirmCv()
        }

      }).catch(()=> {

        if(cancelCv instanceof Function){

          cancelCv()
        }
    })
  }
}
