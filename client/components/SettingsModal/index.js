import React from 'react'
import VisualizerOptions from './VisualizerSettings/VisualizerSettings'

import classes from './settingsModal.module.scss'

const settingsModal = () => {
  return (
    <div className={classes.body}>
      <h1>Settings</h1>
      <VisualizerOptions/>
    </div>
  )
}

export default settingsModal;