import { ElNotification, ElMessageBox } from 'element-plus'

export default class Notification {

  static info = (message, title) => {
    this.fireNotification({ title, message, type:"info" })
  }

  static success = (message, title) => {
    this.fireNotification({ title, message, type:"success" })
  }

  static warning = (message, title) => {
    this.fireNotification({ title, message, type:"warning" })
  }

  static error = (message, title) => {
    this.fireNotification({ title, message, type:"error" })
  }

  static fireNotification = ({ title, message, type }) => {

    ElNotification({
      title: title,
      message: message,
      type: type,
    })

  }

  static confirm = ({ message, title, confirmCv, cancelCv, config = null } ) => {
    this.showConfirm(message, title, confirmCv, cancelCv)
  }

  static defaultConfirmationConfig = {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }

  static showConfirm = (message, title, confirmCv, cancelCv, config = null) => {

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
