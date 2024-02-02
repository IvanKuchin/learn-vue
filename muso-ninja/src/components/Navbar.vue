<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png" alt="logo" />
            <h1><router-link :to="{ name: 'home' }">Muso ninjas</router-link></h1>
            <div class="links">
                <span v-if="user !== null">
                    <router-link :to="{ name: 'CreatePlaylist' }">Create playlist</router-link>
                    <router-link :to="{ name: 'UserPlaylists' }">My playlist</router-link>
                    <span>{{ user.displayName }}</span>
                    <button v-if="isPending === false" @click="handleClick">Logout</button>
                    <button v-if="isPending === true">Logout</button>
                </span>
                <span v-if="user === null">
                    <router-link class="btn" :to="{ name: 'signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'login' }">Login</router-link>
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

export default {
    name: "Navbar",
    setup() {
        const router = useRouter();
        const { logout, error, isPending } = useLogout();
        const { user } = getUser();

        const handleClick = async () => {
            await logout();

            if (!error.value) {
                router.push({ name: "login" });
            } else {
                console.log(error.value);
            }
        };

        return {
            handleClick,
            error,
            isPending,
            user,
        };
    },
};
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>