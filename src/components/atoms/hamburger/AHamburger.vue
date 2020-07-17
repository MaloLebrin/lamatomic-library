<template>
    <AButton
        class="a-hamburger" :class="{ 'hamburger--is-open': isOpen }"
        @click="$emit('click')"
    >
        <AText :span="span" class="hamburger-bar"></AText>
    </AButton>
</template>

<script lang="ts">
import Vue from 'vue'
import AButton from '../button/AButton.vue'
import AText from '../text/AText.vue'

export default Vue.extend({
  name: 'AHamburger',
  components: {
      AButton,
      AText
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    span: {
        type: String,
        default: null
    }
  }
})
</script>

<style lang="scss">
$hamburger-color: black;
$hamburger-background-color: transparent;
$hamburger-width: 2.8rem;
$hamburger-height: 2.2rem;
$hamburger-bar-thickness: .3rem;
$hamburger-bar-space: .4rem;
$hamburger-bar-border-radius: 1rem;
$hamburger-pad: 0;
$hamburger-transistion-duration: .3s;

.a-hamburger {
  $this: &;

  appearance: none;
  background-color: $hamburger-background-color;
  border: 0;
  border-radius: none;
  box-shadow: none;
  cursor: pointer;
  display: block;
  font-size: 0;
  height: $hamburger-height;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-indent: -9999px;
  transition: background $hamburger-transistion-duration;
  width: $hamburger-width;

  &:focus {
    outline: none;
  }

  &-bar {
    background: $hamburger-color;
    display: block;
    height: $hamburger-bar-thickness;
    left: $hamburger-pad;
    position: absolute;
    right: $hamburger-pad;
    top: ($hamburger-height / 2) - ($hamburger-bar-thickness / 2);
    transition: background 0s $hamburger-transistion-duration;

    &,
    &::after,
    &::before {
      border-radius: 2px;
    }

    &::after,
    &::before {
      background: $hamburger-color;
      content: '';
      display: block;
      height: $hamburger-bar-thickness;
      left: 0;
      position: absolute;
      width: 100%;
    }

    &::before {
      top: -$hamburger-bar-thickness - $hamburger-bar-space;
      transition: top $hamburger-transistion-duration $hamburger-transistion-duration, transform $hamburger-transistion-duration 0s, background $hamburger-transistion-duration 0s;
    }

    &::after {
      bottom: -$hamburger-bar-thickness - $hamburger-bar-space;
      transition: bottom $hamburger-transistion-duration $hamburger-transistion-duration, transform $hamburger-transistion-duration 0s, background $hamburger-transistion-duration 0s;
    }
  }

  &--is-open {

    #{$this}-bar {
      background: none;

      &::before,
      &::after {
        background-color: $hamburger-color;
      }

      &::before {
        top: 0;
        transform: rotate(45deg);
        transition: top $hamburger-transistion-duration 0s, transform $hamburger-transistion-duration $hamburger-transistion-duration, background $hamburger-transistion-duration 0s;
      }

      &::after {
        bottom: 0;
        transform: rotate(-45deg);
        transition: bottom $hamburger-transistion-duration 0s, transform $hamburger-transistion-duration $hamburger-transistion-duration, background $hamburger-transistion-duration 0s;
      }
    }
  }
}
</style>
