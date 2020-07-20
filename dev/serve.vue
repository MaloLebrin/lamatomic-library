<template>
  <div id="app">
    <AText align="right" weight="bold" italic>Oh yeah!</AText>
    <AButton>Yeah</AButton>
    <AHeading>Gros titre de fou</AHeading>
    <AInputDate />

    <MLogo />

    <OFooter>
        <template #colonne1><AText>© Copyright 2020</AText></template>
        <template #colonne2>
            <div id="social-part">
                <div>
                    <AText>Follow if you care</AText>
                </div>
                <div>
                    <AList :items="socialButtonItems" :horizontal="true" without-chips />
                </div>
            </div>
        </template>
        <template #colonne3>
            <MNavbar :items="items" :horizontal="false" />
        </template>
    </OFooter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getMountedComponent } from '@/utils'
import { AButton, AHeading, ALink, AText, AList, MLogo, MNavbar, MSocialButtonInstagram, MSocialButtonLinkedin, MSocialButtonTwitter, MSocialButtonFacebook, OFooter } from '@/entry';

const SocialButton1 = getMountedComponent(MSocialButtonInstagram, {})
const SocialButton2 = getMountedComponent(MSocialButtonLinkedin, {})
const SocialButton3 = getMountedComponent(MSocialButtonTwitter, {})
const SocialButton4 = getMountedComponent(MSocialButtonFacebook, {})

const socialButtonItems:String[] = [SocialButton1, SocialButton2, SocialButton3, SocialButton4]

const link1 = getMountedComponent(
    ALink,
    { href: 'https://bananas.com/' },
    { default: 'Our Bananas' }
)

const link2 = getMountedComponent(
    ALink,
    { href: 'https://kiwis.com/' },
    { default: 'Our Kiwis' }
)

const link3 = getMountedComponent(
    ALink,
    { href: 'https://oranges.com/' },
    { default: 'Our Oranges' }
)

const items:String[] = [link1, link2, link3]


export default Vue.extend({
  name: 'ServeDev',
  components: {
    AButton,
    AHeading,
    AText,
    AList,
    OFooter,
    MLogo,
    MNavbar
  },
  data() {
      return {
          items,
          socialButtonItems
      }
  }
});
</script>

<style lang="scss">
$white: #fff;
$black: #2B2B2B;
#social-part {
    flex-direction: column;

    div {
        flex: 1 1 auto;
    }
}
</style>
