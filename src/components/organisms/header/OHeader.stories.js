import { storiesOf } from '@storybook/vue'
import { OHeader, MNavItem } from '@/entry'

const wrapper = {
    components: { OHeader, MNavItem }
}

storiesOf('Organisms/header', module)
    .add('Header default', () => ({
        ...wrapper,
        template:
            `<OHeader>
                <template #navBarItems>
                    <MNavItem>
                        <button>Bonjour 1</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 2</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 3</button>
                    </MNavItem>
                </template>
            </OHeader>`
    }))

    .add('Header with logo AImage', () => ({
        ...wrapper,
        template:
            `<OHeader srcLogo="http://www.institutfrance.si/modules/uploader/uploads/news/pictures_news/AF_Slovenie_Logo_site_2.jpg"" >
                <template #navBarItems>
                    <MNavItem>
                        <button>Bonjour 1</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 2</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 3</button>
                    </MNavItem>
                </template>
            </OHeader>`
    }))

    .add('Header with logo SVG', () => ({
        ...wrapper,
        template:
            `<OHeader>
                <template #LogoSvg>
                    <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 640.5 434.7" enable-background="new 0 0 640.5 434.7" xml:space="preserve">
                        <g>
                            <g>
                                <path fill="#FFFFFF" d="M416.6,107.7c-1.3-6.3-6.3-13.1-16-13.6L375.4,93c-7.7-0.4-10.5-4.6-11.6-7.2c-0.1-0.2-0.2-0.5-0.2-0.7
                                    c-2-7.6-8.3-10.3-13.4-10.3c-5.2,0-11.4,2.7-13.4,10.3L322.5,139c1,0,2,0,3,0c14.2,0.2,35.3,0.6,56.4-3.9c0,0,0.1,0,0.1,0
                                    c0,0,0.1,0,0.1,0c8.3-1.8,16.5-4.3,24.4-7.9l0.9-0.5C416.3,122.2,417.9,114,416.6,107.7z M371.5,115.7c-3.9,0-7.1-3.2-7.1-7.1
                                    c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C378.6,112.5,375.4,115.7,371.5,115.7z"/>
                                <path fill="#FFFFFF" d="M325.4,151.9c-7.5-0.2-11.7-0.5-11.7-0.5c-43.4-3.4-58.2-0.6-62.9,2.4c-0.2,0.1-0.4,0.2-0.5,0.3
                                    c-9.1,4.6-13.9,15.2-11.3,25.1l12.4,41.1c1.6,5.5,7.4,11.9,18.1,11.9c10.8,0,16.5-6.4,18.1-11.9l9-30.1c1.2-3.9,4.8-6.6,9.1-6.6
                                    c4.3,0,7.9,2.6,9.1,6.6l9,30.1c1.6,5.5,7.4,11.9,18.1,11.9c10.8,0,16.5-6.4,18.1-11.9l12.4-40.9c0-0.2,0.1-0.4,0.2-0.6l1.5-5.7
                                    c3.2-12.2,4.2-18.7,3.9-24.2C357.9,152.4,338.8,152.3,325.4,151.9z"/>
                            </g>
                            <g>
                                <path fill="#0671FC" d="M75.6,341.1h17.8v10.5H62v-55.7h13.6V341.1z"/>
                                <path fill="#0671FC" d="M97.1,317.3c1.7-3.4,4.1-6.1,7-7.9c3-1.9,6.3-2.8,9.9-2.8c3.1,0,5.9,0.6,8.2,1.9c2.4,1.3,4.2,2.9,5.4,5
                                    v-6.3h13.6v44.3h-13.6v-6.3c-1.3,2.1-3.2,3.7-5.5,5c-2.4,1.3-5.1,1.9-8.2,1.9c-3.6,0-6.9-0.9-9.8-2.8c-3-1.9-5.3-4.6-7-8
                                    c-1.7-3.5-2.6-7.5-2.6-12C94.5,324.8,95.3,320.8,97.1,317.3z M124.9,321.4c-1.9-2-4.2-2.9-6.9-2.9c-2.7,0-5,1-6.9,2.9
                                    c-1.9,1.9-2.8,4.6-2.8,8c0,3.4,0.9,6.1,2.8,8.1c1.9,2,4.2,3,6.9,3c2.7,0,5-1,6.9-2.9c1.9-2,2.8-4.6,2.8-8
                                    C127.7,326,126.7,323.3,124.9,321.4z"/>
                                <path fill="#0671FC" d="M218.1,311.8c3.3,3.3,4.9,8,4.9,13.9v25.9h-13.5v-24.1c0-2.9-0.8-5.1-2.3-6.6c-1.5-1.6-3.6-2.3-6.2-2.3
                                    c-2.6,0-4.7,0.8-6.2,2.3c-1.5,1.6-2.3,3.8-2.3,6.6v24.1h-13.5v-24.1c0-2.9-0.8-5.1-2.3-6.6c-1.5-1.6-3.6-2.3-6.2-2.3
                                    c-2.6,0-4.7,0.8-6.2,2.3c-1.5,1.6-2.3,3.8-2.3,6.6v24.1h-13.6v-44.3H162v5.6c1.4-1.8,3.2-3.3,5.4-4.4c2.2-1.1,4.7-1.6,7.5-1.6
                                    c3.3,0,6.3,0.7,8.9,2.1c2.6,1.4,4.7,3.5,6.2,6.1c1.5-2.4,3.6-4.4,6.3-6c2.6-1.5,5.5-2.3,8.7-2.3
                                    C210.4,306.8,214.8,308.4,218.1,311.8z"/>
                                <path fill="#0671FC" d="M229.6,317.3c1.7-3.4,4.1-6.1,7-7.9c3-1.9,6.3-2.8,9.9-2.8c3.1,0,5.9,0.6,8.2,1.9c2.4,1.3,4.2,2.9,5.4,5
                                    v-6.3h13.6v44.3h-13.6v-6.3c-1.3,2.1-3.2,3.7-5.5,5c-2.4,1.3-5.1,1.9-8.2,1.9c-3.6,0-6.9-0.9-9.8-2.8c-3-1.9-5.3-4.6-7-8
                                    c-1.7-3.5-2.6-7.5-2.6-12C227,324.8,227.9,320.8,229.6,317.3z M257.4,321.4c-1.9-2-4.2-2.9-6.9-2.9c-2.7,0-5,1-6.9,2.9
                                    c-1.9,1.9-2.8,4.6-2.8,8c0,3.4,0.9,6.1,2.8,8.1c1.9,2,4.2,3,6.9,3c2.7,0,5-1,6.9-2.9c1.9-2,2.8-4.6,2.8-8
                                    C260.2,326,259.3,323.3,257.4,321.4z"/>
                                <path fill="#0671FC" d="M281.1,317.3c1.9-3.4,4.5-6.1,7.9-7.9c3.4-1.9,7.2-2.8,11.6-2.8c5.6,0,10.2,1.5,13.9,4.4
                                    c3.7,2.9,6.2,7,7.3,12.3h-14.5c-1.2-3.4-3.6-5.1-7.1-5.1c-2.5,0-4.5,1-6,2.9c-1.5,1.9-2.2,4.7-2.2,8.3c0,3.6,0.7,6.4,2.2,8.3
                                    c1.5,1.9,3.5,2.9,6,2.9c3.5,0,5.8-1.7,7.1-5.1h14.5c-1.2,5.2-3.6,9.3-7.4,12.2c-3.8,3-8.4,4.4-13.9,4.4c-4.3,0-8.2-0.9-11.6-2.8
                                    c-3.4-1.9-6-4.5-7.9-7.9c-1.9-3.4-2.8-7.5-2.8-12.1C278.2,324.8,279.2,320.8,281.1,317.3z"/>
                                <path fill="#0671FC" d="M335.4,349.4c-3.5-1.9-6.2-4.5-8.2-7.9c-2-3.4-3-7.5-3-12.1c0-4.5,1-8.6,3-12c2-3.5,4.8-6.1,8.3-8
                                    c3.5-1.9,7.4-2.8,11.8-2.8s8.3,0.9,11.8,2.8c3.5,1.9,6.2,4.5,8.3,8c2,3.5,3,7.5,3,12c0,4.6-1,8.6-3.1,12c-2,3.5-4.8,6.1-8.3,8
                                    c-3.5,1.9-7.5,2.8-11.8,2.8C342.8,352.2,338.9,351.3,335.4,349.4z M353.7,337.6c1.8-1.9,2.7-4.6,2.7-8.2c0-3.5-0.9-6.3-2.7-8.2
                                    c-1.8-1.9-4-2.9-6.6-2.9c-2.6,0-4.8,0.9-6.6,2.8c-1.7,1.9-2.6,4.6-2.6,8.2c0,3.5,0.9,6.3,2.6,8.2c1.7,1.9,3.9,2.9,6.5,2.9
                                    S351.9,339.5,353.7,337.6z"/>
                                <path fill="#0671FC" d="M443.8,311.8c3.3,3.3,4.9,8,4.9,13.9v25.9h-13.5v-24.1c0-2.9-0.8-5.1-2.3-6.6c-1.5-1.6-3.6-2.3-6.2-2.3
                                    s-4.7,0.8-6.2,2.3c-1.5,1.6-2.3,3.8-2.3,6.6v24.1h-13.5v-24.1c0-2.9-0.8-5.1-2.3-6.6c-1.5-1.6-3.6-2.3-6.2-2.3
                                    c-2.6,0-4.7,0.8-6.2,2.3c-1.5,1.6-2.3,3.8-2.3,6.6v24.1h-13.6v-44.3h13.6v5.6c1.4-1.8,3.2-3.3,5.4-4.4c2.2-1.1,4.7-1.6,7.5-1.6
                                    c3.3,0,6.3,0.7,8.9,2.1c2.6,1.4,4.7,3.5,6.2,6.1c1.5-2.4,3.6-4.4,6.3-6c2.6-1.5,5.5-2.3,8.7-2.3
                                    C436.2,306.8,440.5,308.4,443.8,311.8z"/>
                                <path fill="#0671FC" d="M473.9,308.5c2.3-1.3,5.1-1.9,8.2-1.9c3.7,0,7,0.9,9.9,2.8c3,1.9,5.3,4.5,7,7.9c1.7,3.4,2.6,7.4,2.6,12
                                    c0,4.6-0.9,8.6-2.6,12c-1.7,3.5-4.1,6.1-7,8c-3,1.9-6.3,2.8-9.9,2.8c-3.1,0-5.8-0.6-8.1-1.9c-2.4-1.3-4.2-2.9-5.5-4.9v27.3h-13.6
                                    v-65.4h13.6v6.3C469.7,311.5,471.5,309.8,473.9,308.5z M485,321.3c-1.9-1.9-4.2-2.9-6.9-2.9c-2.7,0-5,1-6.9,2.9
                                    c-1.9,2-2.8,4.6-2.8,8c0,3.4,0.9,6.1,2.8,8c1.9,2,4.2,2.9,6.9,2.9c2.7,0,5-1,6.9-3c1.9-2,2.9-4.7,2.9-8.1
                                    C487.8,325.9,486.8,323.3,485,321.3z"/>
                                <path fill="#0671FC" d="M530.7,340v11.5h-6.9c-4.9,0-8.8-1.2-11.5-3.6c-2.8-2.4-4.1-6.3-4.1-11.8v-17.6h-5.4v-11.3h5.4v-10.8h13.6
                                    v10.8h8.9v11.3h-8.9v17.8c0,1.3,0.3,2.3,1,2.9c0.6,0.6,1.7,0.9,3.2,0.9H530.7z"/>
                                <path fill="#0671FC" d="M535.4,317.3c1.7-3.4,4.1-6.1,7-7.9c3-1.9,6.3-2.8,9.9-2.8c3.1,0,5.9,0.6,8.2,1.9c2.4,1.3,4.2,2.9,5.4,5
                                    v-6.3h13.6v44.3H566v-6.3c-1.3,2.1-3.2,3.7-5.5,5c-2.4,1.3-5.1,1.9-8.2,1.9c-3.6,0-6.9-0.9-9.8-2.8c-3-1.9-5.3-4.6-7-8
                                    c-1.7-3.5-2.6-7.5-2.6-12C532.8,324.8,533.7,320.8,535.4,317.3z M563.2,321.4c-1.9-2-4.2-2.9-6.9-2.9c-2.7,0-5,1-6.9,2.9
                                    c-1.9,1.9-2.8,4.6-2.8,8c0,3.4,0.9,6.1,2.8,8.1c1.9,2,4.2,3,6.9,3c2.7,0,5-1,6.9-2.9c1.9-2,2.8-4.6,2.8-8
                                    C566,326,565.1,323.3,563.2,321.4z"/>
                            </g>
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="347.3977" y1="64.6439" x2="300.8979" y2="247.3802">
                                <stop  offset="0" style="stop-color:#16A0FA"/>
                                <stop  offset="1" style="stop-color:#015DFD"/>
                            </linearGradient>
                            <path fill="url(#SVGID_1_)" d="M429.2,105c-2.9-13.6-14.2-23.1-28-23.7l-25.1-1.2c-0.2,0-0.3,0-0.4,0c-3.7-11-13.6-18.2-25.4-18.2
                                c-12.3,0-22.7,8-25.9,19.9l-14.9,56.4c-36.1-2.6-55.9-1.2-65.3,4.6c-14.4,7.4-21.8,24.1-17.7,39.8c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                                l12.4,41.3c3.8,12.8,15.8,21.1,30.5,21.1c0,0,0,0,0,0c14.7,0,26.7-8.3,30.5-21.1l5.8-19.3l5.8,19.3c3.8,12.8,15.8,21.1,30.5,21.1
                                c14.7,0,26.7-8.3,30.5-21.1l12.5-41.3c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l1.6-6.1c3.7-14.1,4.9-22.1,4.1-30.2
                                c7.2-1.9,14.4-4.3,21.4-7.5c0.1,0,0.2-0.1,0.2-0.1l1.1-0.5C425.8,131.9,432.1,118.6,429.2,105z M325.4,151.9
                                c13.4,0.4,32.6,0.5,52.6-2.9c0.3,5.5-0.6,12-3.9,24.2l-1.5,5.7c-0.1,0.2-0.1,0.4-0.2,0.6l-12.4,40.9c-1.6,5.5-7.4,11.9-18.1,11.9
                                c-10.8,0-16.5-6.4-18.1-11.9l-9-30.1c-1.2-3.9-4.8-6.6-9.1-6.6c-4.3,0-7.9,2.6-9.1,6.6l-9,30.1c-1.6,5.5-7.4,11.9-18.1,11.9
                                c-10.8,0-16.5-6.4-18.1-11.9l-12.4-41.1c-2.6-9.9,2.2-20.4,11.3-25.1c0.2-0.1,0.4-0.2,0.5-0.3c4.7-3,19.5-5.9,62.9-2.4
                                C313.7,151.4,317.9,151.7,325.4,151.9z M407.6,126.7l-0.9,0.5c-7.8,3.6-16.1,6.1-24.4,7.9c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                                c-21.1,4.5-42.2,4.2-56.4,3.9c-1,0-2.1,0-3,0l14.2-53.9c2-7.6,8.3-10.3,13.4-10.3c5.2,0,11.4,2.7,13.4,10.3
                                c0.1,0.3,0.1,0.5,0.2,0.7c1,2.5,3.8,6.8,11.6,7.2l25.1,1.2c9.8,0.5,14.7,7.3,16,13.6C417.9,114,416.3,122.2,407.6,126.7z"/>
                            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="380.4999" y1="73.0672" x2="334.0001" y2="255.8035">
                                <stop  offset="0" style="stop-color:#16AEFA"/>
                                <stop  offset="1" style="stop-color:#015DFD"/>
                            </linearGradient>
                            <circle fill="url(#SVGID_2_)" cx="371.5" cy="108.6" r="7.1"/>
                            <path fill="#FFFFFF" d="M416.6,107.7c-1.3-6.3-6.3-13.1-16-13.6L375.4,93c-7.7-0.4-10.5-4.6-11.6-7.2c-0.1-0.2-0.2-0.5-0.2-0.7
                                c-2-7.6-8.3-10.3-13.4-10.3c-5.2,0-11.4,2.7-13.4,10.3L322.5,139c1,0,2,0,3,0c14.2,0.2,35.3,0.6,56.4-3.9c0,0,0.1,0,0.1,0
                                c0,0,0.1,0,0.1,0c8.3-1.8,16.5-4.3,24.4-7.9l0.9-0.5C416.3,122.2,417.9,114,416.6,107.7z M371.5,115.7c-3.9,0-7.1-3.2-7.1-7.1
                                c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C378.6,112.5,375.4,115.7,371.5,115.7z"/>
                            <g>
                                <g>
                                    <path fill="#DADADA" d="M378,149L378,149L378,149L378,149c-14.6,2.5-28.7,3.1-40.4,3.1c-4.4,0-8.6-0.1-12.2-0.2
                                        c-2-0.1-3.8-0.1-5.3-0.2c4.2,1.4,29.1,9.1,55.5,9.1c0.5,0,0.9,0,1.4,0l0,0l0.1,0C377.9,155.9,378.2,152.2,378,149"/>
                                </g>
                                <g>
                                    <path fill="#0C71D6" d="M378,149L378,149C378,149,378,149,378,149L378,149 M390.7,146.3c0,0-4.3,1.3-12.7,2.7
                                        c0.2,3.3-0.1,6.9-1,11.9c4.4,0,8.8-0.3,13.2-0.9C391,154.8,391.1,150.5,390.7,146.3"/>
                                </g>
                            </g>
                        </g>
                        </svg>
                    </template>
                <template #navBarItems>
                    <MNavItem>
                        <button>Bonjour 1</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 2</button>
                    </MNavItem>

                    <MNavItem>
                        <button>Bonjour 3</button>
                    </MNavItem>
                </template>
            </OHeader>`
        }))
