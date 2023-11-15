<script lang="ts">
    import {
        ActivitySquare,
        Atom,
        Beef,
        Bitcoin,
        SunMoon,
        Cat,
        BookMarked,
        Camera,
        Car,
        CircleDollarSign,
        Clapperboard,
        Cpu,
        Dices,
        EyeOff,
        FastForward,
        FlaskConical,
        Gamepad,
        Globe,
        Globe2,
        GraduationCap,
        HeartPulse,
        Image,
        Laugh,
        Library,
        LibraryBig,
        LineChart,
        MapPinned,
        Network,
        Medal,
        Music,
        BookOpenText,
        Newspaper,
        PersonStanding,
        Pill,
        Plane,
        SigmaSquare,
        Sparkle,
        Gavel,
        Church,
        Sparkles,
        Syringe,
        TentTree,
        Trash2,
        Tv,
        Salad,
        Dumbbell,
        Utensils,
        Wallet,
        Brain,
        ChefHat,
        Martini,
    } from "lucide-svelte";

    export let icon: string;
</script>

{#if icon === "activity-square"}
    <ActivitySquare />
{:else if icon === "atom"}
    <Atom />
{:else if icon === "eye-off"}
    <EyeOff />
{:else if icon === "sun-moon"}
    <SunMoon />
{:else if icon === "cat"}
    <Cat />
{:else if icon === "chef-hat"}
    <ChefHat />
{:else if icon === "martini"}
    <Martini />
{:else if icon === "beef"}
    <Beef />
{:else if icon === "bitcoin"}
    <Bitcoin />
{:else if icon === "book-marked"}
    <BookMarked />
{:else if icon === "brain"}
    <Brain />
{:else if icon === "salad"}
    <Salad />
{:else if icon === "dumbbell"}
    <Dumbbell />
{:else if icon === "camera"}
    <Camera />
{:else if icon === "car"}
    <Car />
{:else if icon === "circle-dollar-sign"}
    <CircleDollarSign />
{:else if icon === "clapperboard"}
    <Clapperboard />
{:else if icon === "cpu"}
    <Cpu />
{:else if icon === "dices"}
    <Dices />
{:else if icon === "network"}
    <Network />
{:else if icon === "fast-forward"}
    <FastForward />
{:else if icon === "flask-conical"}
    <FlaskConical />
{:else if icon === "gamepad"}
    <Gamepad />
{:else if icon === "globe"}
    <Globe />
{:else if icon === "globe-2"}
    <Globe2 />
{:else if icon === "graduation-cap"}
    <GraduationCap />
{:else if icon === "heart-pulse"}
    <HeartPulse />
{:else if icon === "person-standing"}
    <PersonStanding />
{:else if icon === "pill"}
    <Pill />
{:else if icon === "book-open-text"}
    <BookOpenText />
{:else if icon === "sparkle"}
    <Sparkle />
{:else if icon === "gavel"}
    <Gavel />
{:else if icon === "church"}
    <Church />
{:else if icon === "plane"}
    <Plane />
{:else if icon === "sigma-square"}
    <SigmaSquare />
{:else if icon === "tent-tree"}
    <TentTree />
{:else if icon === "utensils"}
    <Utensils />
{:else if icon === "map-pinned"}
    <MapPinned />
{:else if icon === "library"}
    <Library />
{:else if icon === "library-big"}
    <LibraryBig />
{:else if icon === "syringe"}
    <Syringe />
{:else if icon === "sparkles"}
    <Sparkles />
{:else if icon === "trash-2"}
    <Trash2 />
{:else if icon === "laugh"}
    <Laugh />
{:else if icon === "music"}
    <Music />
{:else if icon === "tv"}
    <Tv />
{:else if icon === "medal"}
    <Medal />
{:else if icon === "image"}
    <Image />
{:else if icon === "line-chart"}
    <LineChart />
{:else if icon === "wallet"}
    <Wallet />
{:else if icon === "newspaper"}
    <Newspaper />
{:else}
    <!-- Do nothing -->
{/if}
