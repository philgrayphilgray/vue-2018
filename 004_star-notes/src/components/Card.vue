<template lang="pug">
v-flex.mb-2(xs12)
    v-card
        v-menu.ma-0.list__menu.card__edit-button.right( bottom offset-y)
            v-btn(flat icon slot="activator")
                v-icon edit
            v-list
                v-list-tile(@click="onDeleteCard(card.id)")
                    v-icon.mr-1 edit
                    | Edit                      
                v-list-tile(@click="onDeleteCard(card.id)")
                    v-icon.mr-1 delete
                    | Delete
        v-toolbar(flat)
            v-container.ma-0
                v-layout(row wrap)
                    v-flex(xs12)
                        h3
                            a(:href="card.clone_url" target="blank") {{card.name}}
                    v-flex(xs6)
                        img.card__avatar.mr-2(:src="card.owner.avatar_url")
                        span {{card.owner.login}}
                        span.right
                            v-icon(small) star
                            | {{card.stargazers_count}}

        v-card-text 
            h4 Description
            p {{card.description}}
            h4 My Notes
            p {{card.notes}}
        v-card-actions
            v-icon notes
</template>
<script>
export default {
  // eslint-disable-next-line
  props: ['card'],
  methods: {
    onDeleteCard(cardId) {
      this.$store.dispatch('deleteCard', { cardId });
    },
  },
};
</script>
<style lang="scss" scoped>
.card__edit-button {
  z-index: 100;
}
.card__avatar {
  width: 10px;
}
</style>
