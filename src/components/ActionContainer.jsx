import React from 'react'
import SearchComponent from './SearchComponent'
import FilterComponent from './FilterComponent'
import DownloadComponent from './DownloadComponent'
import CreateComponent from './CreateComponent'

const ActionContainer = (props) => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center gap-4'>
            <SearchComponent {...props}/>
            <FilterComponent />
            <DownloadComponent />
        </div>
        <CreateComponent {...props}/>
    </div>
  )
}

export default ActionContainer
