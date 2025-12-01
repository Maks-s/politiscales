<template>
  <h2 class="text-2xl font-bold text-center" v-text="$t('results')" />

  <i18n-t
    keypath="results_desc"
    scope="global"
    tag="p"
    class="max-w-[640px] mt-2 mx-auto mb-4"
  >
    <template #look_text>
      <NuxtLink to="/legacy/about" class="underline">{{
        $t('results_desc_look_text')
      }}</NuxtLink>
    </template>
  </i18n-t>

  <canvas
    id="generatedResults"
    width="800"
    height="1200"
    class="mx-auto"
  ></canvas>

  <div class="max-w-2xl mx-auto my-6 p-4">
    <div
      id="urlToCopy"
      class="font-mono text-sm p-2 border border-gray-300 break-all"
    ></div>
  </div>

  <div class="flex flex-wrap justify-center gap-4 my-4">
    <button
      id="buttonLink"
      class="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors cursor-pointer"
      @click="copyLinkToClipboard"
    >
      <Icon name="line-md:link" class="text-2xl" />
      <span v-text="$t('copy_link')" />
    </button>

    <button
      id="buttonImage"
      class="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors cursor-pointer"
      @click="download_image()"
    >
      <Icon name="line-md:download" class="text-2xl" />
      <span v-text="$t('download')" />
    </button>

    <template v-for="social in socialButtons" :key="social.id">
      <a
        :id="social.id"
        :href="social.href"
        :class="[
          'flex items-center gap-2 px-4 py-2 text-white rounded transition-colors cursor-pointer',
          social.bgClass,
          social.hoverClass
        ]"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :name="`line-md:${social.icon}`" class="text-2xl" />
        <span v-text="$t(social.textKey)" />
      </a>
    </template>
  </div>

  <hr class="my-8 border-gray-700" />

  <div class="my-8 text-center">
    <canvas
      id="generatedFlag"
      width="512"
      height="256"
      class="mx-auto"
    ></canvas>
    <div id="slogan" class="mt-4 text-3xl font-bold"></div>
  </div>

  <div id="bonusBox" class="max-w-4xl mx-auto mt-12 space-y-6">
    <h3 class="text-2xl font-bold" v-text="$t('bonus_chars')" />

    <div id="anarBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/anarchism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('anarchist')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('anarchist_desc')" />
      </div>
    </div>

    <div id="pragBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/pragmatism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('pragmatist')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('pragmatist_desc')" />
      </div>
    </div>

    <div id="femiBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/feminism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('feminist')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('feminist_desc')" />
      </div>
    </div>

    <div id="compBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/complotism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('conspiracist')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('conspiracist_desc')" />
      </div>
    </div>

    <div id="vegaBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/veganism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('vegan')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('vegan_desc')" />
      </div>
    </div>

    <div id="monaBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/monarchism.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('monarchist')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('monarchist_desc')" />
      </div>
    </div>

    <div id="reliBonus" class="flex items-start gap-4 p-4">
      <div class="flex-shrink-0 w-32 h-32 p-1">
        <img
          src="/images/religion.png"
          alt=""
          class="w-full h-full object-contain"
        />
      </div>
      <div class="flex-1">
        <h4
          class="text-lg font-semibold text-gray-300 mb-1"
          v-text="$t('missionary')"
        />
        <p class="text-gray-400 text-sm" v-text="$t('missionary_desc')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { legacyAxisToAxis } from '@/utils/legacy/axes'

const { t, locale } = useI18n()
const { decodeResultsStr } = useSerializer()
const url = useRequestURL()

const results = decodeResultsStr(url.hash.slice(1) || '')

// Get the results URL based on locale
function getResultsUrl() {
  if (locale.value === 'fr') {
    return url.href
      .replace(url.hostname + '/politiscales', 'politiscales.fr')
      .replace(url.hostname, 'politiscales.fr')
      .replace('/fr/', '/')
  } else {
    return url.href
      .replace(url.hostname + '/politiscales', 'politiscales.party')
      .replace(url.hostname, 'politiscales.party')
  }
}

const socialText = encodeURIComponent(t('share_desc'))
const socialUrl = encodeURIComponent(getResultsUrl())

// Social share buttons configuration
const socialButtons = [
  {
    id: 'buttonTwitter',
    bgClass: 'bg-blue-400',
    hoverClass: 'hover:bg-blue-500',
    textKey: 'twitter_share',
    href: `https://twitter.com/intent/tweet?text=${socialText}&url=${socialUrl}`,
    icon: 'twitter-filled'
  },
  {
    id: 'buttonReddit',
    bgClass: 'bg-orange-500',
    hoverClass: 'hover:bg-orange-600',
    textKey: 'reddit_share',
    href: `https://www.reddit.com/submit?title=${socialText}&url=${socialUrl}`,
    icon: 'reddit'
  }
]

// Copy link to clipboard
function copyLinkToClipboard() {
  const resultsUrl = getResultsUrl()
  navigator.clipboard.writeText(resultsUrl).then(() => {
    const button = document.getElementById('buttonLink')
    if (button) {
      const originalText = button.innerHTML
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M20 6L9 17l-5-5"/></svg> ${t('copied')}`
      button.classList.add('bg-green-600', 'hover:bg-green-700')
      button.classList.remove('bg-blue-600', 'hover:bg-blue-700')

      setTimeout(() => {
        button.innerHTML = originalText
        button.classList.remove('bg-green-600', 'hover:bg-green-700')
        button.classList.add('bg-blue-600', 'hover:bg-blue-700')
      }, 2000)
    }
  })
}

function init_results() {
  const resultsUrl = getResultsUrl()
  const urlToCopy = document.getElementById('urlToCopy')
  if (urlToCopy) {
    urlToCopy.innerHTML = resultsUrl
  }

  const images = {
    sprites: '/images/flag_sprites.png',
    c0: '/images/constructivism_small.png',
    c1: '/images/essentialism_small.png',
    j0: '/images/rehabilitative_justice_small.png',
    j1: '/images/punitive_justice_small.png',
    s0: '/images/progressive_small.png',
    s1: '/images/conservative_small.png',
    b0: '/images/internationalism_small.png',
    b1: '/images/nationalism_small.png',
    p0: '/images/communism_small.png',
    p1: '/images/capitalism_small.png',
    m0: '/images/regulation_small.png',
    m1: '/images/laissez_faire_small.png',
    e0: '/images/ecology_small.png',
    e1: '/images/production_small.png',
    t0: '/images/revolution_small.png',
    t1: '/images/reform_small.png',
    anar: '/images/anarchism_small.png',
    prag: '/images/pragmatism_small.png',
    femi: '/images/feminism_small.png',
    comp: '/images/complotism_small.png',
    vega: '/images/veganism_small.png',
    mona: '/images/monarchism_small.png',
    reli: '/images/religion_small.png'
  }

  let numImageLoaded = 0

  const axes = ['c', 'b', 'p', 'm', 's', 'j', 'e', 't']

  const bonus = {
    anar: 0.9,
    prag: 0.5,
    femi: 0.9,
    comp: 0.9,
    vega: 0.5,
    reli: 0.5,
    mona: 0.5
  }

  const characteristics = []
  const axesValues = {
    c: 0,
    b: 0,
    p: 0,
    m: 0,
    s: 0,
    j: 0,
    e: 0,
    t: 0
  }

  let left = 0
  let right = 0

  for (let i = 0; i < axes.length; i++) {
    const negativeValue = getQueryVariable(axes[i] + '0')
    const positiveValue = getQueryVariable(axes[i] + '1')
    setAxisValue(axes[i] + 'AxisNeg', negativeValue)
    setAxisValue(axes[i] + 'AxisPos', positiveValue)
    setAxisValue(axes[i] + 'AxisMid', 1 - negativeValue - positiveValue)

    left += negativeValue
    right += positiveValue

    characteristics.push({ name: axes[i] + '0', value: negativeValue })
    characteristics.push({ name: axes[i] + '1', value: positiveValue })

    axesValues[axes[i]] = positiveValue - negativeValue
  }

  for (const b in bonus) {
    const value = getQueryVariable(b)
    const bonusValue = bonus[b]

    setBonus(b + 'Bonus', value, bonusValue)

    if (value > bonusValue) {
      characteristics.push({ name: b, value: value })
    }
  }

  characteristics.sort((a, b) => {
    return a.value - b.value
  })

  const charSlogan = {
    b0: t('humanity'),
    b1: t('fatherland'),
    c0: t('equality'),
    e0: t('ecology'),
    j0: t('justice'),
    j1: t('order'),
    m1: t('liberty'),
    p0: t('socialism'),
    p1: t('work'),
    s1: t('family'),
    t0: t('revolution')
  }

  let generatedSlogan = ''
  const sloganDiv = document.getElementById('slogan')
  if (sloganDiv) {
    const selectedSlogan = []

    for (const charac of characteristics) {
      if (charac.value > 0 && Object.hasOwn(charSlogan, charac.name)) {
        selectedSlogan.push({
          text: charSlogan[charac.name],
          value: charac.value
        })
      }
    }

    selectedSlogan.sort((a, b) => {
      return a.value - b.value
    })

    let counter = 0
    for (const slogan of selectedSlogan) {
      if (generatedSlogan !== '') generatedSlogan += ' · '
      generatedSlogan += slogan.text
      counter++

      if (counter >= 3) break
    }

    sloganDiv.innerHTML = generatedSlogan
  }

  for (const b of Object.keys(images)) {
    const key = b
    const src = images[key]
    images[key] = new Image()
    images[key].src = typeof src === 'string' ? src : ''
    images[key].onload = onImageLoaded
  }

  /* USUAL FUNCTIONS */

  function getQueryVariable(variable) {
    if (results !== null) {
      return results[legacyAxisToAxis(variable)]
    }

    const query = window.atob(window.location.search.substring(1))
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] == variable) {
        if (pair[1] == 'NaN') {
          return 0
        } else {
          return Number(pair[1]) / 100
        }
      }
    }
    return 0
  }

  function setAxisValue(name, value) {
    const axis = document.getElementById(name)
    if (!axis) return

    const text = document.getElementById(name + 'Text')
    if (!text) return

    axis.style.width = (100 * value).toFixed(1) + '%'

    text.innerHTML = (100 * value).toFixed(0) + '%'
    if (text.offsetWidth > axis.offsetWidth - 5) text.style.display = 'none'
    else text.style.display = ''
  }

  function setBonus(name, value, limit) {
    const axis = document.getElementById(name)
    if (!axis) return

    if (value > limit) {
      axis.style.display = 'flex'
      axis.style.opacity = value * value
    } else {
      axis.style.display = 'none'
    }
  }

  function findFlagColors() {
    const colors = []

    for (let i = 0; i < flagColors.length; i++) {
      let accepted = 1
      let mainValue = 0
      let mainValueFound = 0

      for (const cond of Object.keys(flagColors[i].cond)) {
        let charFound = 0
        for (let k = 0; k < characteristics.length; k++) {
          if (legacyAxisToAxis(characteristics[k].name) == cond) {
            charFound = 1

            if (
              characteristics[k].value < flagColors[i].cond[cond].vmin ||
              characteristics[k].value > flagColors[i].cond[cond].vmax
            )
              accepted = 0
            else if (!mainValueFound) {
              mainValueFound = 1
              mainValue = characteristics[k].value
            }

            break
          }
        }

        if (!charFound) accepted = 0

        if (!accepted) break
      }

      if (accepted) {
        colors.push({
          bgColor: flagColors[i].bgColor,
          fgColor: flagColors[i].fgColor,
          value: mainValue
        })
      }
    }

    colors.sort(function (a, b) {
      return b.value - a.value
    })

    return colors
  }

  function findFlagShape(numColors) {
    let flagFound = -1
    const flagValue = [0, 0, 0]
    let flagColor = 0

    for (let i = 0; i < flagShapes.length; i++) {
      if (flagShapes[i].numColors > numColors) continue

      let condValue = [0, 0]
      let accepted = 1
      const conds = Object.keys(flagShapes[i].cond)
      if (conds.length > 0) {
        for (let j = 0; j < conds.length; j++) {
          const cond = conds[j]
          const condToAxeValue = {
            constructivism: 'c',
            essentialism: 'c',
            rehabilitative_justice: 'j',
            punitive_justice: 'j',
            progressive: 's',
            conservative: 's',
            internationalism: 'b',
            nationalism: 'b',
            communism: 'p',
            capitalism: 'p',
            regulation: 'm',
            laissez_faire: 'm',
            ecology: 'e',
            production: 'e',
            revolution: 't',
            reform: 't'
          }

          const value = axesValues[condToAxeValue[cond]]
          if (
            value < flagShapes[i].cond[cond].vmin ||
            value > flagShapes[i].cond[cond].vmax
          ) {
            accepted = 0
          }
          if (j < 3) condValue[j] = Math.abs(value)

          if (!accepted) break
        }
      } else {
        condValue = [0, 0]
      }

      if (accepted && flagColor <= flagShapes[i].numColors) {
        if (flagShapes[i].numColors > flagColor) {
          flagColor = flagShapes[i].numColors
          flagValue[0] = condValue[0]
          flagValue[1] = condValue[1]
          flagValue[2] = condValue[2]
          flagFound = i
        } else if (condValue[0] > flagValue[0]) {
          flagColor = flagShapes[i].numColors
          flagValue[0] = condValue[0]
          flagValue[1] = condValue[1]
          flagValue[2] = condValue[2]
          flagFound = i
        } else if (condValue[0] == flagValue[0]) {
          if (condValue[1] > flagValue[1]) {
            flagColor = flagShapes[i].numColors
            flagValue[0] = condValue[0]
            flagValue[1] = condValue[1]
            flagValue[2] = condValue[2]
            flagFound = i
          } else if (condValue[1] == flagValue[1]) {
            if (condValue[2] > flagValue[2]) {
              flagColor = flagShapes[i].numColors
              flagValue[0] = condValue[0]
              flagValue[1] = condValue[1]
              flagValue[2] = condValue[2]
              flagFound = i
            }
          }
        }
      }
    }

    return flagFound
  }

  function getCharacteristic(name, vmin, vmax) {
    for (let k = 0; k < characteristics.length; k++) {
      if (legacyAxisToAxis(characteristics[k].name) != name) continue

      if (characteristics[k].value >= vmin && characteristics[k].value <= vmax)
        return characteristics[k].value
      else return -1.0
    }

    return -1.0
  }

  function findFlagSymbol(numColors) {
    const symbol0 = {
      parent_type: 'none',
      transform: {}
    }
    const symbol1 = {
      parent_type: 'none',
      transform: {}
    }
    let valueMax = 0

    if (numColors == 0) {
      symbol0.parent_type = 'dot'
      symbol0.transform = {
        child_type: 'none',
        x: 3,
        y: 3,
        main: true,
        parent_tx: 0,
        parent_ty: 0,
        parent_sx: 1,
        parent_sy: 1,
        parent_r: 0,
        child_tx: 0,
        child_ty: 0,
        child_sx: 1,
        child_sy: 1,
        child_r: 0
      }
    }

    for (let s0 = 0; s0 < flagSymbols.length; s0++) {
      const cond0 = Object.keys(flagSymbols[s0].cond)[0]
      const charVal0 = getCharacteristic(
        cond0,
        flagSymbols[s0].cond[cond0].vmin,
        flagSymbols[s0].cond[cond0].vmax
      )
      if (charVal0 > 0) {
        let value = charVal0 * 1.5
        let transform0 = -1
        if (value > valueMax) {
          for (let k0 = 0; k0 < flagSymbols[s0].data.transforms.length; k0++) {
            if (flagSymbols[s0].data.transforms[k0].child_type == 'none') {
              transform0 = k0
            }
          }

          if (transform0 >= 0) {
            symbol0.parent_type = flagSymbols[s0].data.parent_type
            symbol0.transform = flagSymbols[s0].data.transforms[transform0]
            symbol1.parent_type = 'none'
            valueMax = value
          }
        }

        for (let s1 = s0 + 1; s1 < flagSymbols.length; s1++) {
          transform0 = -1
          let transform1 = -1
          for (let k0 = 0; k0 < flagSymbols[s0].data.transforms.length; k0++) {
            for (
              let k1 = 0;
              k1 < flagSymbols[s1].data.transforms.length;
              k1++
            ) {
              if (
                flagSymbols[s0].data.parent_type ==
                  flagSymbols[s1].data.transforms[k1].child_type &&
                flagSymbols[s1].data.parent_type ==
                  flagSymbols[s0].data.transforms[k0].child_type
              ) {
                transform0 = k0
                transform1 = k1
              }
            }
          }

          if (transform1 < 0 || transform0 < 0) continue

          const cond1 = Object.keys(flagSymbols[s1].cond)[0]
          const charVal1 = getCharacteristic(
            cond1,
            flagSymbols[s1].cond[cond1].vmin,
            flagSymbols[s1].cond[cond1].vmax
          )
          if (charVal1 > 0) {
            value = charVal0 + charVal1
            if (value > valueMax) {
              symbol0.parent_type = flagSymbols[s0].data.parent_type
              symbol0.transform = flagSymbols[s0].data.transforms[transform0]
              symbol1.parent_type = flagSymbols[s1].data.parent_type
              symbol1.transform = flagSymbols[s1].data.transforms[transform1]
              valueMax = value
            }
          }
        }
      }
    }

    if (
      symbol0.parent_type != 'none' &&
      symbol1.parent_type != 'none' &&
      symbol1.transform.main &&
      !symbol0.transform.main
    )
      return [symbol1, symbol0]
    else return [symbol0, symbol1]
  }

  function onImageLoaded() {
    numImageLoaded++

    if (numImageLoaded < images.length) {
      return
    }

    const flag = document.getElementById('generatedFlag')
    if (flag) {
      const ctx = flag.getContext('2d')

      let spriteX = 256
      let spriteY = 128
      let spriteS = 1.0

      const colors = findFlagColors()
      const symbolData = findFlagSymbol(colors.length)

      const flagId = findFlagShape(colors.length)

      if (colors.length <= 0)
        colors.push({ bgColor: '#ffffff', fgColor: '#000000' })

      if (flagId < 0) {
        ctx.beginPath()
        ctx.rect(0, 0, 512, 256)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      } else {
        for (let i = 0; i < flagShapes[flagId].shape.paths.length; i++) {
          const path = flagShapes[flagId].shape.paths[i]
          const numPoints = path.length / 2

          ctx.beginPath()
          ctx.moveTo(path[1] * 512, path[2] * 256)

          if (path[1] == 'circle') {
            ctx.arc(
              path[2] * 512,
              path[3] * 256,
              path[4] * 256,
              0,
              2 * Math.PI,
              false
            )
          } else if (
            path[1] == 'circleSymbol' &&
            symbolData[0].parent_type != 'none'
          ) {
            ctx.arc(
              path[2] * 512,
              path[3] * 256,
              path[4] * 256,
              0,
              2 * Math.PI,
              false
            )
          } else {
            for (let j = 1; j < numPoints; j++) {
              ctx.lineTo(path[1 + j * 2 + 0] * 512, path[1 + j * 2 + 1] * 256)
            }
          }
          ctx.fillStyle = colors[path[0]].bgColor
          ctx.fill()
        }

        spriteX = flagShapes[flagId].shape.symbol[0] * 512
        spriteY = flagShapes[flagId].shape.symbol[1] * 256
        spriteS = flagShapes[flagId].shape.symbol[2]
      }

      if (symbolData[0].parent_type != 'none') {
        const tmpC = document.createElement('canvas')
        tmpC.width = images['sprites'].width
        tmpC.height = images['sprites'].height
        const tmpCtx = tmpC.getContext('2d')

        tmpCtx.beginPath()
        tmpCtx.rect(0, 0, tmpC.width, tmpC.height)
        tmpCtx.fillStyle = colors[0].fgColor
        tmpCtx.fill()

        tmpCtx.globalCompositeOperation = 'destination-in'
        tmpCtx.drawImage(images['sprites'], 0, 0)

        ctx.save()
        ctx.translate(spriteX, spriteY)
        ctx.scale(spriteS, spriteS)

        const sx = symbolData[0].transform.x
        const sy = symbolData[0].transform.y

        ctx.save()
        ctx.translate(
          symbolData[0].transform.parent_tx,
          -symbolData[0].transform.parent_ty
        )
        ctx.rotate((symbolData[0].transform.parent_r * Math.PI) / 180)
        ctx.scale(
          symbolData[0].transform.parent_sx,
          symbolData[0].transform.parent_sy
        )
        ctx.drawImage(tmpC, sx * 128, sy * 128, 128, 128, -64, -64, 128, 128)
        ctx.restore()

        if (symbolData[1].parent_type != 'none') {
          const sx = symbolData[1].transform.x
          const sy = symbolData[1].transform.y

          ctx.translate(
            symbolData[0].transform.child_tx,
            -symbolData[0].transform.child_ty
          )
          ctx.rotate((symbolData[0].transform.child_r * Math.PI) / 180)
          ctx.scale(
            symbolData[0].transform.child_sx,
            symbolData[0].transform.child_sy
          )

          ctx.translate(
            symbolData[1].transform.parent_tx,
            -symbolData[1].transform.parent_ty
          )
          ctx.rotate((symbolData[1].transform.parent_r * Math.PI) / 180)
          ctx.scale(
            symbolData[1].transform.parent_sx,
            symbolData[1].transform.parent_sy
          )

          ctx.drawImage(tmpC, sx * 128, sy * 128, 128, 128, -64, -64, 128, 128)
          ctx.restore()
        }

        ctx.restore()
      }
    }

    const rPreview = document.getElementById('generatedResults')
    if (rPreview) {
      const ctx = rPreview.getContext('2d')

      ctx.beginPath()
      ctx.rect(0, 0, rPreview.width, rPreview.height)
      ctx.fillStyle = '#ebebeb'
      ctx.fill()

      let yPos = 20

      if (flag) {
        const flagSize = 160

        //Logo
        ctx.beginPath()
        ctx.rect(0, 0, rPreview.width, 42)
        ctx.fillStyle = '#500076'
        ctx.fill()

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 25px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText('P️olitiScales', 10, 30)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 15px sans-serif'
        ctx.textAlign = 'right'
        if (window.location.pathname.indexOf('/politiscales') > -1) {
          ctx.fillText(
            window.location.host + '/politiscales',
            rPreview.width - 10,
            27
          )
        } else {
          ctx.fillText(window.location.host, rPreview.width - 10, 27)
        }
        yPos += 48

        //Flag
        ctx.drawImage(
          flag,
          0,
          0,
          flag.width,
          flag.height,
          rPreview.width / 2.0 - flagSize,
          yPos,
          flagSize * 2,
          flagSize
        )
        yPos += flagSize + 10

        //Slogan
        ctx.fillStyle = '#000000'
        ctx.font = '25px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(generatedSlogan, rPreview.width / 2.0, yPos + 30)
        yPos += 70

        // Totals
        ctx.fillStyle = '#777'
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(
          `${Math.round(left * 100)}–${Math.round(right * 100)}`,
          rPreview.width - 7,
          rPreview.height - 10
        )

        //Axes
        const axesDrawInfo = [
          {
            key: 'c',
            color0: '#a425b6',
            color1: '#34b634',
            name0: t('constructivism'),
            name1: t('essentialism')
          },
          {
            key: 'j',
            color0: '#14bee1',
            color1: '#e6cc27',
            name0: t('rehabilitative_justice'),
            name1: t('punitive_justice')
          },
          {
            key: 's',
            color0: '#850083',
            color1: '#970000',
            name0: t('progressive'),
            name1: t('conservative')
          },
          {
            key: 'b',
            color0: '#3e6ffd',
            color1: '#ff8500',
            name0: t('internationalism'),
            name1: t('nationalism')
          },
          {
            key: 'p',
            color0: '#cc0000',
            color1: '#ffb800',
            name0: t('communism'),
            name1: t('capitalism')
          },
          {
            key: 'm',
            color0: '#269B32',
            color1: '#6608C0',
            name0: t('regulation'),
            name1: t('laissez_faire')
          },
          {
            key: 'e',
            color0: '#a0e90d',
            color1: '#4deae9',
            name0: t('ecology'),
            name1: t('production')
          },
          {
            key: 't',
            color0: '#eb1a66',
            color1: '#0ee4c8',
            name0: t('revolution'),
            name1: t('reform')
          }
        ]

        const axeMargin = 100
        const axeWidth = rPreview.width - axeMargin * 2
        ctx.strokeStyle = '#888888'
        for (let i = 0; i < axesDrawInfo.length; i++) {
          const negativeValue = getQueryVariable(axesDrawInfo[i]['key'] + '0')
          const positiveValue = getQueryVariable(axesDrawInfo[i]['key'] + '1')
          const neutralValue = 1 - negativeValue - positiveValue

          const negSize = axeWidth * negativeValue
          const posSize = axeWidth * positiveValue
          const ntrSize = axeWidth * neutralValue

          ctx.beginPath()
          ctx.rect(0.5 + axeMargin + negSize, 0.5 + yPos, ntrSize, 30)
          ctx.stroke()

          ctx.beginPath()
          ctx.rect(0.5 + axeMargin, 0.5 + yPos, negSize, 30)
          ctx.fillStyle = axesDrawInfo[i]['color0']
          ctx.fill()
          ctx.stroke()

          ctx.beginPath()
          ctx.rect(
            0.5 + rPreview.width - axeMargin - posSize,
            0.5 + yPos,
            posSize,
            30
          )
          ctx.fillStyle = axesDrawInfo[i]['color1']
          ctx.fill()
          ctx.stroke()

          if (negSize > 40) {
            ctx.fillStyle = '#ffffff'
            ctx.font = '20px sans-serif'
            ctx.textAlign = 'right'
            ctx.fillText(
              Math.round(negativeValue * 100) + '%',
              axeMargin + negSize - 5,
              yPos + 23
            )
          }

          if (posSize > 40) {
            ctx.fillStyle = '#ffffff'
            ctx.font = '20px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillText(
              Math.round(positiveValue * 100) + '%',
              axeMargin + negSize + ntrSize + 5,
              yPos + 23
            )
          }

          if (ntrSize > 40) {
            ctx.fillStyle = '#888888'
            ctx.font = '20px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(
              Math.round(neutralValue * 100) + '%',
              axeMargin + negSize + ntrSize / 2,
              yPos + 23
            )
          }

          ctx.drawImage(
            images[axesDrawInfo[i]['key'] + '0'],
            axeMargin - 73,
            yPos - 27
          )
          ctx.drawImage(
            images[axesDrawInfo[i]['key'] + '1'],
            rPreview.width - axeMargin + 73 - 86,
            yPos - 27
          )

          ctx.fillStyle = '#000000'
          ctx.font = '16px sans-serif'
          ctx.textAlign = 'left'
          ctx.fillText(axesDrawInfo[i]['name0'], axeMargin + 8, yPos - 6)

          ctx.textAlign = 'right'
          ctx.fillText(
            axesDrawInfo[i]['name1'],
            rPreview.width - axeMargin - 8,
            yPos - 6
          )

          yPos += 100
        }

        let xShift = 0
        let numBonus = 0
        for (const b in bonus) {
          const value = getQueryVariable(b)
          if (value > bonus[b]) {
            numBonus++
          }
        }

        for (const b in bonus) {
          const value = getQueryVariable(b)
          if (value > bonus[b]) {
            ctx.drawImage(
              images[b],
              rPreview.width / 2 - ((numBonus - 1) * 100) / 2 + xShift - 43,
              yPos - 27
            )
            xShift += 100
          }
        }
      }
    }
  }
}

function download_image() {
  const canvas = document.getElementById('generatedResults')
  const link = document.createElement('a')
  link.href = canvas.toDataURL()
  link.download =
    'PolitiScales_' +
    t('results') +
    '_' +
    new Date().toLocaleDateString() +
    '.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

if (typeof window !== 'undefined') {
  // Wait for the DOM to be ready
  setTimeout(init_results, 0)
}
</script>

<style scoped>
/* Button states for the share link button */
.buttonLinkGood {
  background-color: #0eb31a !important;
  color: white !important;
}
.buttonLinkGood:hover {
  background-color: #0ea01a !important;
}
.buttonLinkGood svg {
  fill: white !important;
}

/* Canvas shadow */
canvas {
  box-shadow: 0 1px 1px 1px #aaa;
}
</style>
