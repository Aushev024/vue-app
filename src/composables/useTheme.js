import { ref, onMounted } from 'vue';

export function useTheme() {
    const theme = ref(localStorage.getItem('theme') || 'light');

    const setTheme = (newTheme) => {
        theme.value = newTheme;
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        setTheme(theme.value === 'light' ? 'dark' : 'light');
    };

    onMounted(() => {
        setTheme(localStorage.getItem('theme') || 'light');
    });

    return {
        theme,
        toggleTheme,
    };
}