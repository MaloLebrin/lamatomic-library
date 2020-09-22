import { storiesOf } from '@storybook/vue'
import AIcon from '.AIcon.vue'

const wrapper = {
    components: { AIcon }
}

storiesOf('Atoms', module)

.add('Default', () => ({
    ...wrapper,
    template:
        `<AIcon>
            <g>
            <g>
                <g>
                    <path
                        class="st0"
                        d="M452,40h-24V0h-40v40H124V0H84v40H60C26.9,40,0,66.9,0,100v352c0,33.1,26.9,60,60,60h392
                        c33.1,0,60-26.9,60-60V100C512,66.9,485.1,40,452,40z M472,452c0,11-9,20-20,20H60c-11,0-20-9-20-20V188h432V452z M472,148H40
                        v-48c0-11,9-20,20-20h24v40h40V80h264v40h40V80h24c11,0,20,9,20,20V148z"
                    />
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="230" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="230" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="230" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="230" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="396" y="230" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="310" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="310" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="310" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="310" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="76" y="390" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="156" y="390" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="236" y="390" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="316" y="390" class="st0" width="40" height="40" />
                </g>
            </g>
            <g>
                <g>
                    <rect x="396" y="310" class="st0" width="40" height="40" />
                </g>
            </g>
        </g>
        </AIcon>`,
}))
