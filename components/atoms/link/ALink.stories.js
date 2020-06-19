import ALink from './ALink.vue'

export default { title: 'Atomes/Liens' }

export const lienInterne = () => ({
    components: { ALink },
    stubs: {
        NuxtLink: true
    },
    template:
        '<ALink to="contact" title="Me rendre au formulaire de contact">Lien vers la page contact</ALink>'
})

export const lienExterne = () => ({
    components: { ALink },
    stubs: {
        NuxtLink: true
    },
    template:
        '<ALink href="https://www.leroymerlin.fr/v3/p/produits/lien-alu-fou-argent-5-m-geolia-e167177">Lien alu-fou</ALink>'
})

export const lienTelephone = () => ({
    components: { ALink },
    stubs: {
        NuxtLink: true
    },
    template: '<ALink tel href="01 23 45 67 89">Lien téléphone français</ALink>'
})

export const lienMail = () => ({
    components: { ALink },
    stubs: {
        NuxtLink: true
    },
    template: '<ALink mail href="lamavert@lamacompta.co">Lien mail</ALink>'
})

export const lienNoLine = () => ({
    components: { ALink },
    stubs: {
        NuxtLink: true
    },
    template: '<ALink href="#" no-line>Lien non souligné</ALink>'
})
