import 'babel-polyfill'
import {chooseImagemin} from "../../src/index";
import React from 'react'
import ReactDOM from 'react-dom'
import './demo.less'
import {regex,trim} from 'changlin-util'


const container = document.createElement('div');
document.body.appendChild(container);
document.title = 'imagemin demo'

class ImageCard extends React.Component {
    handleDownload = () => {
        const {name, result} = this.props.data;
        const a = document.createElement('a');
        a.href = result;
        a.setAttribute('target', '_blank');
        a.setAttribute('download', name);
        a.click()
    }

    render() {
        return <li onClick={this.handleDownload}>
            <img src={this.props.data.result} height={'100%'} alt=""/>
            <p className={'name'}>
                {this.props.data.name}
                <br/>
                点击保存
            </p>
        </li>
    }
}

class App extends React.Component {
    state = {
        imageList: [],
        width: 200,
        height: 200,
        q: .7
    }

    handleClick = () => {
        chooseImagemin({
            quality: +this.state.q,
            width: +this.state.width,
            height: +this.state.height
        })
            .catch(e => console.log(e)).then(d => {
            this.setState(state => {
                state.imageList = state.imageList.concat(d)
                return state
            })
        })
    }

    handleChange = (name, value) => {
        value=trim(value)
        if(regex.number.test(value) || value==='' ){
            this.setState({[name]:value})
        }
    }

    render() {
        return (
            <div className={'demo'}>
                <header>
                    <h1>浏览器中图片压缩</h1>
                    <p>提示：低版本浏览器有兼容性问题</p>
                </header>
                <div className="config">
                    压缩设置：<br/>
                    宽：
                    <input
                        type="number"
                        value={this.state.width}
                        onChange={(e) => this.handleChange('width', e.target.value)}
                    />
                    <br/>
                    高：
                    <input
                        type="number"
                        value={this.state.height}
                        onChange={(e) => this.handleChange('height', e.target.value)}
                    />
                    <br/>
                    质量：
                    <input
                        type="number"
                        value={this.state.q}
                        onChange={(e) => this.handleChange('q', e.target.value)}
                    />
                </div>
                <ul className={'imageList'}>
                    {
                        this.state.imageList.map((item, idx) => {
                            return <ImageCard key={idx} data={item}/>
                        })
                    }
                    <li className="button" onClick={this.handleClick}>
                        <div>
                            选择图片
                        </div>
                    </li>
                </ul>
            </div>
        )

    }
}

ReactDOM.render(
    <App/>,
    container
)


// document.getElementById('button').addEventListener('click',(e)=>{
//     chooseImagemin().catch(e=>console.log(e)).then(d=>console.log(d))
// },false)