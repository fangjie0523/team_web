import React, { Component } from 'react'

export class AssistAutoTextarea extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            lastLength: 0,
            lastHeight: 0,
            pasteText: '',//粘贴文本
            cancelBlur: false,//取消触发blur的回调函数
            inputValue: '',
        }
    }

    static defaultProps = {
        value: '',
        placeholder: '',
        className: '',
        style: {},
        pasteFile: false,
        banClick: false,//控制辅助div的click事件
        selected: false,//是否选中所有内容
        // cancelBlurCallback: false,//取消this.props.onblur
    }

    componentDidMount() {
        let { value, autoFocus } = this.props
        let dom = this.textareaDom
        dom.value = value
        dom.style.height = dom.scrollHeight + 'px'
        autoFocus && dom.focus()
        this.setState({lastHeight: dom.scrollHeight,lastLength: dom.value.length})
    }

    componentWillReceiveProps(nextProps,nextState) {
        if(nextProps.cancelBlurCallback) {
            this._handleBlur(nextProps.cancelBlurCallback)
        }
    }

    componentWillUnmount() {
        // clearTimeout(this.blurTimer)
    }

    _handleChange = (e) => {
        let { onChange } = this.props
        let { lastLength, lastHeight } = this.state
        let eDom = e.target
        let currentLength = eDom.value.length
        if(currentLength < lastLength) {
            eDom.style.height = '31px'
        }
        let currentHeight = eDom.scrollHeight
        if(lastHeight !== currentHeight || eDom.style.height === '31px') {
            eDom.style.height = currentHeight + 'px'
        }
        this.setState({lastHeight: currentHeight,lastLength: currentLength})
        // onChange ? onChange(e) : null
    }

    _handleBlur = cancel => {
        let { onBlur, cancelBlurCallback } = this.props
        let { cancelBlur, inputValue } = this.state
        if(!cancel) return
        if(!!onBlur && !cancelBlur) {
            onBlur(inputValue)
        }else {
            this.setState({cancelBlur: false})
        }
    }

    _handleEnter = event => {
        let { onEnter } = this.props
        let eTarget = event.target
        // !!onEnter ? onEnter(e) : null
        if(event.keyCode === 13) {
            event.preventDefault()
            this.setState({cancelBlur: true},()=>{
                this.textareaDom.blur()
                // !!onEnter ? onEnter(eTarget) : null
            })
        }
    }

    render() {
        let { placeholder, maxLength, className, style, inputStyle, onEnter, banClick, onFocus, selected, cancelBlurCallback } = this.props
        return(
            <div className='assist-auto-text-box db'
                style={style}
            >
                <textarea className={`${className} var-text-box`}
                    style={Object.assign({}, inputStyle, {height:'32px'}) }
                    placeholder={placeholder || '请输入内容'}
                    maxLength={maxLength || 300}
                    onFocus={e => {
                        selected && e.target.select()
                        onFocus && onFocus(e)
                    }}
                    onBlur={e => {
                        this.setState({inputValue: e.target.value},()=>{
                            cancelBlurCallback === undefined ? this._handleBlur(true) : this._handleBlur(cancelBlurCallback)
                        })
                    }}
                    onKeyDown={this._handleEnter}
                    ref={refs => this.textareaDom = refs}
                    onChange={this._handleChange} 
                ></textarea>
                <div className='assist-paddle db cp' onClick={e=>{
                    if(banClick) return
                    this.textareaDom.focus()
                    // selected && this.textareaDom.select()
                }}></div>
            </div>
            
        )
    }
}