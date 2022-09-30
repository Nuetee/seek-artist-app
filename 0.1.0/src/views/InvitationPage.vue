<template>
    <div id="invitationPage"></div>
</template>
<script>
    import { 
        isAuth, 
        getAuth 
    } from '@/modules/auth';
    import { User } from '@/classes/user';
    import { Exhibition } from '@/classes/exhibition';

    export default {
        name: 'InvitationPage',
        components: {},
        data() {
            return {
                id: this.$route.query.id,
                user: null
            };
        },
        beforeCreate() {},
        async created() {
            if (isAuth()) {
                this.user = getAuth()
            }
            else {
                this.$router.replace({
                    path: '/login',
                    query: {
                        redirect: this.$route.fullPath
                    }
                })
                return
            }
            let exhibition = await new Exhibition(this.id).init()
            await exhibition.initializePage()

            this.collaborator_id_list = await exhibition.getCollaboratorList()
            this.collaborator_id_list.push(exhibition.getOwner().getID())

            if (!this.collaborator_id_list.includes(this.user.getID())) {
                await exhibition.postCollaborator(this.user)
            }
            this.$router.replace({
                path: '/exhibition-modify',
                query: {
                    id: this.$route.query.id,
                }
            })
            
        },
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeUnmount() {},
        unmounted() {},
        methods: {}
    }
</script>