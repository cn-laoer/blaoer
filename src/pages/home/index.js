import React,{Component} from 'react';
import {Button,Upload, Icon, message} from 'antd';
// import { aget } from '../../api/ajax';

// 本地图片文件转换为base64格式
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }
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
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            imageUrl: ''
        };
    }
    // componentDidMount() {
    //     this.getData();
    // }
    // getData () {
    //     aget(`${global.serviceUrl}/goods`).then((res) => {
    //         console.log(res);
    //         this.setState({
    //             data: res.msg
    //         });
    //     });
    // }
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
                }
            }
        //   getBase64(info.file.originFileObj, imageUrl =>
        //     this.setState({
        //       imageUrl,
        //       loading: false,
        //     }),
        //   );
        }
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="bmain">
                <Button type="primary">button</Button>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${global.serviceUrl}/uploadImg`}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
        )
    }
}