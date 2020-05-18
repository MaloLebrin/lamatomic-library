import Link from './Link.vue'

export default { title: 'Atomes/Liens' }

export const lienInterne = () => ({
    components: { Link },
    stubs: {
        NuxtLink: true
    },
    template:
        '<Link to="/contact" title="Me rendre au formulaire de contact">Lien vers la page contact</Link>'
})

export const lienExterne = () => ({
    components: { Link },
    stubs: {
        NuxtLink: true
    },
    template:
        '<Link href="https://www.leroymerlin.fr/v3/p/produits/lien-alu-fou-argent-5-m-geolia-e167177">Lien alu-fou</Link>'
})
