const { remote } = require('webdriverio');

(async () => {
    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: "Android",
            "appium:deviceName": "emulator-5554",
            "appium:automationName": "UiAutomator2",
            "appium:appPackage": "com.android.settings",
            "appium:appActivity": ".Settings"
        }
    });

    console.log("Simulando login...");

    // Esperar que cargue Settings
    await driver.pause(5000);

    // 🔍 Intentar abrir búsqueda (varias opciones por si cambia)
    let searchBtn;

    try {
        searchBtn = await driver.$('android=new UiSelector().descriptionContains("Buscar")');
        await searchBtn.click();
    } catch (e) {
        try {
            searchBtn = await driver.$('android=new UiSelector().textContains("Buscar")');
            await searchBtn.click();
        } catch (e2) {
            searchBtn = await driver.$('android=new UiSelector().className("android.widget.ImageView")');
            await searchBtn.click();
        }
    }

    // Esperar que aparezca el input
    await driver.pause(3000);

    // ✍️ Escribir "usuario"
    const input = await driver.$('android=new UiSelector().className("android.widget.EditText")');
    await input.setValue("usuario_prueba");

    await driver.pause(2000);

    // ✍️ Escribir "password"
    await input.setValue("password123");

    await driver.pause(5000);

    console.log("Texto escrito correctamente!");

    await driver.deleteSession();
})();