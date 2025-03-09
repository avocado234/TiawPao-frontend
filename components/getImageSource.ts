const localImages: { [key: string]: any } = {
    "rayong/rayong1.png": require("../assets/images/rayong/rayong1.png"),
    "korat/korat1.png": require("../assets/images/korat/korat1.png"),
    "trang/trang1.png": require("../assets/images/trang/trang1.png"),
};

export function getImageSource(imagePath: string) {
    if (imagePath.startsWith("http")) {
        return { uri: imagePath }; // ใช้รูปจาก URL ถ้ามี
    } else {
        return localImages[imagePath] || require("../assets/images/default-placeholder.jpg");
    }
}
