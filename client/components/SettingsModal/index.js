import React from 'react'
import VisualizerOptions from './VisualizerSettings/VisualizerSettings'

import classes from './settingsModal.module.scss'

const Options = () => {
  return (
    <div className={classes.body}>
      <h1>Options</h1>
      <VisualizerOptions/>
    </div>
  )
}

export default Options