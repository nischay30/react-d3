import React, { Component } from 'react';
import logo from './logo.svg';
import * as d3 from 'd3';
import yaml from 'js-yaml';
import yamlLint from 'yaml-lint';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import Graph from './Graph';

const nodes = [
    {
      "name": "one",
    },
    {
      "name": "two",
    },
    {
      "name": "three"
    }
  ]

const links = [
    {
      "source": 1,
      "target": 0
    }
  ]

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      text: '',
      textChanged: '',
      filename:''
    }
    // this.updateFilename=this.updateFilename.bind(this);
    // this.showFileName=this.showFileName.bind(this);
    // this.setFocus=this.setFocus.bind(this);    
  }
  // twoFunc(e) {
  //   this.showFileName(e);
  //   setTimeout(this.setFocus,100);
  //  //setTimeout(function(){ this.setFocus(); }, 3000);
  // }

  // setFocus() {
  //   this.refs.editor.getCodeMirror().focus();
  //   console.log("linecount is"+this.refs.editor.getCodeMirror().lineCount());
  //   this.refs.editor.getCodeMirror().setCursor(this.refs.editor.getCodeMirror().getValue().split("\n").length, 0);
  // }

  // updateFilename(e) {
  //   this.setState({filename:e.target.value});
  // }

  // showFileName(e) {
  //   var temp = e.target.files[0];
  //   var ext = temp.name.split('.').pop().toLowerCase();
  //   if(ext!="yml")
  //   {
  //     alert('Only yml file supported.');
  //   }
  //   else {
  //     var fil = document.getElementById("myFile");
  //     console.log(fil);
  //     var that = this;
  //     this.setState({filename:fil.files[0].name});
  //     var reader = new FileReader();
  //     reader.onload = function(event) {
  //         if(true){
  //           that.setState({text:event.target.result});
  //           //that.split();
  //         }
  //     };
  //     reader.readAsText(temp);
  //   }
  // }

  handleChange = (event) => {
    try{
      let a = yaml.loadAll(event, (doc) => {
        this.setState({textChanged: JSON.stringify(doc, null, 2)});
      });
      var editor = this.refs.editor.getCodeMirror();
        console.log(editor);
        editor.markText({line: 1, ch: 26}, {line: 1, ch: 42}, {className: "styled-background"});
    }
    catch(err){
    console.log("message is "+ err.message);
      var startindex=err.message.indexOf("at line") + 8;
        var endindex=err.message.indexOf("column")-2;
        var errrow=err.message.substring(startindex,endindex);
        console.log(errrow);
    }
      this.setState({ text:event});
  }

  render() { 
    var options = {
    lineNumbers: true,
    gutters: ["CodeMirror-lint-markers"],
          lint: true,
          mode: "text/x-yaml",

  }
    const { width, height } = this.props;
    const styles = {
      graph: {
      width,
      height,
      bottom: 0,
      position: 'fix',
      border: '1px solid #323232',
      },
     button: {
      margin: 20,
      },
     exampleImageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 20,
      left: 0,
      width: '100%',
      opacity: 0,
   },
};
    return (
      <div className="App">
       <MuiThemeProvider>
      <GridList cellHeight="auto" cols={2} style={{marginTop:"4%"}}>
        <GridTile>
          <div >
          <CodeMirror ref="editor" onChange={this.handleChange.bind(this)} value={this.state.text}  options={options} />
          <textarea type='textarea' rows={45} cols={80} value={ this.state.textChanged } style={{'display':'none'}}/>
           </div>
     {/*      <div style={{marginLeft:"1%"}}>
            <TextField
                  hintText="Enter File Name"
                  floatingLabelFixed={true}
                  value={this.state.filename}
                  onChange={this.updateFilename}
            />
            <RaisedButton
                  id="browsewf"
                  label="Browse"
                  labelPosition="before"
                  style={styles.button}
                  containerElement="label" primary={true}>
                   <input type="file" id="myFile" style={styles.exampleImageInput} onChange={this.twoFunc.bind(this)} />
            </RaisedButton>
           </div>*/}
        </GridTile>
      <GridTile style={{height:"650px",marginTop:"0%"}}>
        <Graph styles={ styles.graph } nodes={ nodes } links={ links } width={ this.props.width } height={ this.props.height } />
         </GridTile>
         </GridList>
           </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

