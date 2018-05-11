import './App.css';
import React, {Component} from 'react';
import {KoreanParser} from './KoreanParser'
import {HunkParser} from './HunkParser'

class ParserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: '',
      showHunkTranslation: true,
      showChunkTranslation: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { source, showHunkTranslation, showChunkTranslation } = this.state

    const parsed = HunkParser.parse(source).map((h) => KoreanParser.parse(h))

    return (
      <div>
        <div>
          <h2>Input</h2>
          <textarea
            name="source"
            className="ParserForm-input"
            rows={10}
            value={source}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <h2>Options</h2>
          <label>
            <input
              name="showChunkTranslation"
              type="checkbox"
              checked={this.state.showChunkTranslation}
              onChange={this.handleInputChange} />
            Show Chunked Translations
          </label>
          &nbsp;
          <label>
            <input
              name="showHunkTranslation"
              type="checkbox"
              checked={this.state.showHunkTranslation}
              onChange={this.handleInputChange} />
            Show Line Translations
          </label>
        </div>

        <div>
          <h2>Output</h2>
          Hover over the chunks below to see the translation.
          {
            parsed.map((hunk) =>
              <Hunk
                hunk={hunk}
                showHunkTranslation={showHunkTranslation}
                showChunkTranslation={showChunkTranslation}
              />
            )
          }
        </div>
      </div>
    );
  }
}

const Hunk = ({hunk, showHunkTranslation, showChunkTranslation}) => {
  return (
    <div className="ParserForm-hunk">
      <p><strong>{hunk.source}</strong></p>
      <ul className="ParserForm-chunks">
        {
          hunk.chunks && hunk.chunks.map((chunk) =>
            <Chunk
              chunk={chunk}
              showChunkTranslation={showChunkTranslation}
            />
          )
        }
      </ul>
      <p><em>{showHunkTranslation && hunk.translation}</em></p>
    </div>
  )
}

const Chunk = ({chunk, showChunkTranslation}) => {
  return (
    <li className="ParserForm-chunk" title={chunk.translation}>
      {chunk.source}
      {showChunkTranslation && ' ' + chunk.translation}
    </li>
  )
}
export default ParserForm;
