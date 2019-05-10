import React, {Component} from 'react'
import AsyncSelect from 'react-select/lib/Async'
import { myFetch } from '../utils/netUtils'
import * as Api from '../api/Api'

class CustomComp extends Component{

    handleMouseDown (event) {
        event.preventDefault()
        event.stopPropagation()
        this.props.onSelect(this.props.option, event)
    }
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event)
    }
    handleMouseMove (event) {
        if (this.props.isFocused) return
        this.props.onFocus(this.props.option, event)
    }

    render () {
        // console.log(this.props)
        let {team_name} = this.props.option

        return (
            <div className={this.props.className}
                 onMouseDown={(e)=>this.handleMouseDown(e)}
                 onMouseEnter={(e)=>this.handleMouseEnter(e)}
                 onMouseMove={(e)=>this.handleMouseMove(e)}>
                {`${team_name||''}`}
            </div>
        )
    }
}

export default class SearchTeam extends Component {
    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    static defaultProps = {
      inputStyle: {
          background: 'none',
          border: 'none',
          fontSize: '16px',
          
      }
    }

    componentDidMount () {
        let {relate} = this.props
        this.setState({
            value: relate,
        })
    }

    onChange (value) {
        // console.log('value=', value)
        this.setState({
            value: value,
        })
    }

    getTeam (input) {
        let { token } = this.props
        if (!input) {
            return Promise.resolve({options: []})
        }
        // console.log('input=', input, prod)
        return myFetch(Api.GET_TEAM_LIST_BY_FUZZY,
            {
                body: {
                    team_name: input
                }, 
                method: 'POST'
            },token)
            .then((res) => JSON.parse(res))
            .then((json) => {
                if(json.status === 1) {
                    return {option: json.data}
                }else {
                    return {option: []}
                }
            })
    }

    render () {
        let {className, style, inputStyle} = this.props
        return (
            <div className={className} style={style}>
                <AsyncSelect multi={false}
                              style={inputStyle}
                              value={this.state.value}
                              onChange={(value) => this.onChange(value)}
                              labelKey="full"
                              noResultsText="搜索结果为空"
                            //   valueKey="num"
                              optionComponent={CustomComp}
                              removeSelected
                              searchPromptText= '请输入将要加入的球队'
                              loadOptions={(input) => this.getTeam(input)}
                              backspaceRemoves={true}
                />
            </div>
        )
    }
}