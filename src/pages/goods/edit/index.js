import React,{Component} from 'react';
import { Form, Input, Button, message, Switch, DatePicker,Upload, Icon } from 'antd';
import { apost, aget } from '../../../api/ajax';
import History from '../../../api/history';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


//   上传前处理，大小判断及文件格式判断
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 文件格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        message.error('上传的图片大小不能超过 5MB!');
    }
    return isJpgOrPng && isLt2M;
}
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 11,
      },
    },
};
const dateFormat = 'YYYY/MM/DD';

class editForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            confirmDirty: false,
            exceedDate: '',
            autoCompleteResult: [],
            loading: false,
            imageUrl: '',
            canSub: true,
            detail: {},
            prop: props
        }
    }
    getData() {
        let that = this;
        aget(`${global.serviceUrl}/goods/detail`,{code: Number(that.state.prop.match.params.id)}).then((res)=>{
            if (res.code===0) {
                that.setState({
                    detail: res.data,
                    imageUrl: res.data.goods_img
                });
                this.props.form.setFieldsValue({'goods_img':res.data.goods_img});
                this.props.form.setFieldsValue({'goods_name':res.data.goods_name});
                this.props.form.setFieldsValue({'bar_code':res.data.bar_code});
                this.props.form.setFieldsValue({'brand':res.data.brand});
                this.props.form.setFieldsValue({'exceed_date':res.data.exceed_date.substring(0,10)});
                this.props.form.setFieldsValue({'home':res.data.home});
                this.props.form.setFieldsValue({'hot':res.data.hot===1?true:false});
                this.props.form.setFieldsValue({'is_del':res.data.is_del===1?true:false});
                this.props.form.setFieldsValue({'price':res.data.price});
                this.props.form.setFieldsValue({'prime_date':res.data.prime_date});
                this.props.form.setFieldsValue({'size':res.data.size});
                this.props.form.setFieldsValue({'stock':res.data.stock});
                this.props.form.setFieldsValue({'supplier':res.data.supplier});
                this.props.form.setFieldsValue({'unit':res.data.unit});
                this.props.form.setFieldsValue({'weight':res.data.weight});
                this.props.form.setFieldsValue({'production_date':moment(res.data.production_date, dateFormat)});
                // this.props.form.setFieldsValue({'type':res.data.type});
            } else {
                message.error(res.msg);
            }
        })
    }
    
    addData (data) {
        apost(`${global.serviceUrl}/goods/update`,data).then((res) => {
            // console.log(res);
            if (res.code===0) {
                message.success(res.msg);
                this.setState({
                    canSub: true
                });
                // setTimeout(()=>{
                //     // window.location.href = '/react';
                //     History.push({pathname:`/goods`});
                // },800);
            } else {
                message.error(res.msg);
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.production_date._d);
                let openDate = new Date(values.production_date._d).getTime();
                let datestamp = new Date(openDate);
                let Y = datestamp.getFullYear();
                let M = (datestamp.getMonth()+1)<10?'0'+(datestamp.getMonth()+1):(datestamp.getMonth()+1);
                let D = datestamp.getDate()<10?'0'+datestamp.getDate():datestamp.getDate();
                let openDateStr = Y+'-'+M+'-'+D;
                values.production_date = openDateStr;
                values.is_del === true ? values.is_del = 1: values.is_del = 0;
                values.hot === true ? values.hot = 1: values.hot = 0;
                values.id = this.state.detail.id;
                console.log('Received values of form: ', values);
                if (this.state.canSub) {
                    this.setState({
                        canSub: false
                    });
                    this.addData(values);
                }
            }
        });
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
        //   console.log(info);
            //处理上传完成接口返回状态及图片地址
            if (info&&info.fileList&&info.fileList.length>0) {
                if (info.fileList[0].response.code===200) {
                    this.setState({
                        imageUrl: info.fileList[0].response.data.avatar,
                        loading: false,
                    });
                    this.props.form.setFieldsValue({'goods_img':info.fileList[0].response.data.avatar});
                }
            }
        //   getBase64(info.file.originFileObj, imageUrl =>
        //     this.setState({
        //       imageUrl,
        //       loading: false,
        //     }),
        //   );
        }
    }
    titleValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>30) {
          callback('名称长度不能超过30位!');
        } else {
          callback();
        }
    }
    descValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('长度不能超过100位!');
        } else {
          callback();
        }
    }
    authorValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>100) {
          callback('条码不能超过100位!');
        } else {
          callback();
        }
    }
    imgValidate = (rule, value, callback) => {
        // const { form } = this.props;
        if (value && value.length>1000) {
          callback('图片地址不能超过1000位!');
        } else {
          callback();
        }
    }
    goBack() {
        History.push({pathname:`/goods`});
    }
    render (){
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="bmain" >
                <Button type="primary" 
                    onClick={()=>{this.goBack()}}>
                    <Icon type="left" />
                    Go back
                </Button>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名称">
                        {getFieldDecorator('goods_name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品名称'
                                },
                                {
                                    validator: this.titleValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="条码">
                        {getFieldDecorator('bar_code', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品条码'
                                },
                                {
                                    validator: this.authorValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="品牌">
                        {getFieldDecorator('brand', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入品牌'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="净含量">
                        {getFieldDecorator('weight', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入净含量'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="供应商">
                        {getFieldDecorator('supplier', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入供应商'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="商品单位">
                        {getFieldDecorator('unit', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品单位，包，件，只等'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="规格数量">
                        {getFieldDecorator('size', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入瓶或1*24等'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="售价（分）">
                        {getFieldDecorator('price', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入售价'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="商品图片">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${global.serviceUrl}/uploadImg`}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="goods_img" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="图片地址">
                        {getFieldDecorator('goods_img', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入图片地址'
                                },
                                {
                                    validator: this.imgValidate
                                }
                            ]
                        })(
                            <Input disabled />
                        )}
                    </Form.Item>
                    <Form.Item label="库存">
                        {getFieldDecorator('stock', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入商品库存'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="生产日期">
                        {getFieldDecorator('production_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入生产日期'
                                }
                            ]
                        })(<DatePicker 
                            format={dateFormat}
                            // value={moment(this.state.detail.production_date, dateFormat)}
                            // placeholder={String(this.state.detail.production_date).substring(0,10)}
                            onChange={(date, dateString)=>{
                                let primeStr = this.props.form.getFieldValue('prime_date');
                                let prime = 0;
                                if (primeStr!=null&&primeStr.indexOf('天')!==-1) {
                                    prime = Number(primeStr.substring(0, primeStr.length - 1)); 
                                } else {
                                    prime = Number(primeStr);
                                }
                                let openDate = new Date(dateString).getTime();
                                let openDatestamp = new Date(openDate+(prime*24*60*60*1000));
                                let Y = openDatestamp.getFullYear();
                                let M = (openDatestamp.getMonth()+1)<10?'0'+(openDatestamp.getMonth()+1):(openDatestamp.getMonth()+1);
                                let D = openDatestamp.getDate()<10?'0'+openDatestamp.getDate():openDatestamp.getDate();
                                let exceedDateStr = Y+'-'+M+'-'+D;
                                this.props.form.setFieldsValue({'exceed_date':exceedDateStr});
                            }}
                        />)}
                    </Form.Item>
                    <Form.Item label="保质期（天）">
                        {getFieldDecorator('prime_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入保质期（天）'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input onChange={e => {
                            e.persist();
                            // console.log(e.target.value);
                            let primeStr = e.target.value;
                            let prime = 0;
                            if (primeStr.indexOf('天')!==-1) {
                                prime = Number(primeStr.substring(0, primeStr.length - 1)); 
                            } else {
                                prime = Number(e.target.value);
                            }
                            let openDate = new Date(this.props.form.getFieldValue('production_date')).getTime();
                            let openDatestamp = new Date(openDate+(prime*24*60*60*1000));
                            let Y = openDatestamp.getFullYear();
                            let M = (openDatestamp.getMonth()+1)<10?'0'+(openDatestamp.getMonth()+1):(openDatestamp.getMonth()+1);
                            let D = openDatestamp.getDate()<10?'0'+openDatestamp.getDate():openDatestamp.getDate();
                            let exceedDateStr = Y+'-'+M+'-'+D;
                            this.props.form.setFieldsValue({'exceed_date':exceedDateStr});
                          }}/>)}
                    </Form.Item>
                    <Form.Item label="过期日期">
                        {getFieldDecorator('exceed_date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入过期日期'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item label="产地">
                        {getFieldDecorator('home', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入产地'
                                },
                                {
                                    validator: this.descValidate
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="是否热门">
                        {getFieldDecorator('hot', { valuePropName: 'checked' })(<Switch />)}
                    </Form.Item>
                    {/* <Form.Item label="内容">
                        {getFieldDecorator('content', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入内容'
                                }
                            ]
                        })(<div ref={(e) => {this.refEditor = e}}></div>)}
                    </Form.Item> */}
                    <Form.Item label="是否删除">
                        {getFieldDecorator('is_del', { valuePropName: 'checked' })(<Switch />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    componentDidMount() {
        // const elem = this.refEditor;
        // const editor = new E(elem);
        // // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        // editor.customConfig.onchange = html => {
        //     // console.log(html);
        //     if (editor.txt.text()&&editor.txt.text()!==''&&editor.txt.text().length>0) {
        //         this.props.form.setFieldsValue({'content':html})
        //     } else {
        //         this.props.form.setFieldsValue({'content':''})                
        //     }
        // }
        // editor.create();
        this.getData();
    }
}

const EditFormDom = Form.create({name: 'editForm'})(editForm);
export default class editGoods extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <EditFormDom {...this.props}></EditFormDom>
        )
    }
}
