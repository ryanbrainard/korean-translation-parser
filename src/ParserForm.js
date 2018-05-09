import './App.css';
import React, {Component} from 'react';
import {KoreanParser} from './KoreanParser'
import {HunkParser} from './HunkParser'

class ParserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: '',
      parsed: [],
    }
    this.handleSourceChange = this.handleSourceChange.bind(this)
  }

  handleSourceChange(event) {
    const source = event.target.value
    const parsed = HunkParser.parse(source).map((h) => KoreanParser.parse(h))

    this.setState({ source, parsed });
  }

  render() {
    const { source, parsed } = this.state

    return (
      <div>
        <InputForm source={source} handleSourceChange={this.handleSourceChange} />
        <WebView parsed={parsed}/>
        <RawView parsed={parsed}/>
      </div>
    );
  }
}

const InputForm = ({source, handleSourceChange}) => {
  return (
    <div>
      <h2>Input</h2>
      <form>
        <textarea
          cols={100}
          rows={10}
          value={source}
          onChange={handleSourceChange}
        />
      </form>
    </div>
  )
}

const RawView = ({parsed}) => {
  return (
    <div>
      <h3>Raw</h3>
      <pre>
          {JSON.stringify(parsed, null, '  ')}
        </pre>
    </div>
  )
}

const WebView = ({parsed}) => {
  return (
    <div>
      <h3>Web</h3>
      { parsed.map((hunk) => <Hunk hunk={hunk}/>) }
    </div>
  )
}

const Hunk = ({hunk}) => {
  return (
    <div>
      <p><strong>{hunk.source}</strong></p>
      <ul className="ParserForm-chunks">
        {
          hunk.chunks && hunk.chunks.map((chunk) => <Chunk chunk={chunk}/>)
        }
      </ul>
      <p><em>{hunk.translation}</em></p>
    </div>
  )
}

const Chunk = ({chunk}) => {
  return (
    <li title={chunk.translation}>
      {chunk.source}
    </li>
  )
}
export default ParserForm;
