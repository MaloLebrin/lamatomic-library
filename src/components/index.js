// /* eslint-disable import/prefer-default-export */
// Atoms
// export { default as AButton } from './atoms/button/AButton.vue'
// export { default as AHeading } from './atoms/heading/AHeading.vue'
// export { default as AImage } from './atoms/image/AImage.vue'
// export { default as ALink } from './atoms/link/ALink.vue'
// export { default as AList } from './atoms/list/AList.vue'
// // Molecules
// export { default as MLogo } from './molecules/logo/MLogo.vue'
// export { default as MTyper } from './molecules/typer/MTyper.vue'

const AButton = require('./atoms/button/AButton.vue')

// const path = require('path')
// const glob = require('glob')

// let atomsNames = []
// let foldersNames = []
// let parentFolderNames = []

// glob('src/**/*.vue', function(er, files) {
//     console.log(files)

//     files.forEach((filePath) => {
//         atomsNames.push(path.basename(filePath, '.vue'))
//     })
//     console.log(atomsNames)

//     // atomsNames.forEach((fileName) => {
//     //     if (fileName.substr(0, 1).toLowerCase() == 'a') {
//     //         parentFolderNames.push('atoms')
//     //     } else parentFolderNames.push('molecules')
//     // })
//     // console.log(parentFolderNames)

//     // atomsNames.forEach((fileName) => {
//     //     foldersNames.push(fileName.substr(1).toLowerCase())
//     // })
//     // console.log(foldersNames)
// })

// export { default as atomsNames } from 'src/**/*.vue'
