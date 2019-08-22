// 引入 Component 组件
import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, message, Avatar } from 'antd';
import axios from 'axios';
import moment from 'moment';
import '../../../api/service';
import './index.scss';

const qs= require('qs');
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      // inputType,
      record,
      // index,
      children,
      // ...restProps
    } = this.props;
    return (
      <td>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editingKey: '' };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '8%',
        editable: true,
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: '10%',
        editable: true,
      },
      {
        title: '地址',
        dataIndex: 'url',
        width: '15%',
        editable: true,
      },
      {
        title: '头像',
        dataIndex: 'avator_url',
        width: '20%',
        editable: true,
        render: (text, record) => {
            return (
              <Avatar src={record.avator_url} />
              // <img src={record.avator_url} alt="avator_url"/>
            )
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '5%',
        render: (text,record) => {
            return record.status===1? (
                <span>上架</span>
            ) : (
                <span>下架</span>
            )
        }
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: '15%',
        render: (text,record) => {
            return (
                <span>{moment(record.create_time).format('YYYY-MM-DD hh:mm:ss')}</span>
            )
        }
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        width: '15%',
        render: (text,record) => {
            return (
                <span>{moment(record.update_time).format('YYYY-MM-DD hh:mm:ss')}</span>
            )
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button
                    type="link"
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    确定
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm 
                title="确定取消?"
                onConfirm={() => this.cancel(record.id)}
                okText="确定"
                cancelText="取消"
                >
                <Button type="link">取消</Button>
              </Popconfirm>
              {/* {record.status === 1? <Button type="link" onClick={() => this.downData(record)}>下架</Button>:<Button type="link" onClick={() => this.upData(record)}>上架</Button>} */}
            </span>
          ) : (
            <span>
                <Button type="link" disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
                    编辑
                </Button>
                {record.status === 1? <Button disabled={editingKey !== ''} type="link" onClick={() => this.downData(record)}>下架</Button>:<Button disabled={editingKey !== ''} type="link" onClick={() => this.upData(record)}>上架</Button>}
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`${global.serviceUrl}/newss`)
    .then(res => {
      if (res.status===200) {
        // const datas = res.data.msg.map(obj => obj.data);
        let datas = res.data.msg;
        for (let i=0;i<datas.length;i++) {
          datas[i].key = i;
        }
        this.setState({ data: datas });
        message.success('axios is success');
        this.setState({ editingKey: '' });
      } else {
        message.error('axios is error');
      }
    });
  }

  downData (data) {
    let obj = {
      status: 2,
      id: data.id
    }
    let qsData = qs.stringify(obj);
    axios.get(`${global.serviceUrl}/update/news?${qsData}`)
    .then(res => {
      message.info('this data is down');
      this.getData();
    })
  }

  upData (data) {
    let obj = {
      status: 1,
      id: data.id
    }
    let qsData = qs.stringify(obj);
    axios.get(`${global.serviceUrl}/update/news?${qsData}`)
    .then(res => {
      message.info('this data is up');
      this.getData();
    })
  }

  isEditing = record => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  changeData (data) {
    let upData = data;
    let qsData = qs.stringify(upData);
    axios.get(`${global.serviceUrl}/update/news?${qsData}`)
    .then(res => {
      message.info('this data is update');
    })
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        let qsData = qs.stringify(row);
        axios.get(`${global.serviceUrl}/update/news?${qsData}`)
        .then(res => {
          message.success('this data is update');
          this.setState({ data: newData, editingKey: '' });
        })
      } else {
        let qsData = qs.stringify(row);
        axios.get(`${global.serviceUrl}/update/news?${qsData}`)
        .then(res => {
          message.success('this data is update');
          newData.push(row);
          this.setState({ data: newData, editingKey: '' });
        })
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'id' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          render: col.render
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default class editTable extends Component {
  render() {
    return (
      <div className="bmain dis-before">
        <EditableFormTable></EditableFormTable>
      </div>
    )
  }
}