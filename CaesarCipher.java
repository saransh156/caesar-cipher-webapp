import java.util.ArrayList;
import java.util.Scanner;

public class CaesarCipher {

    // To store encryption/decryption history
    private static ArrayList<String> history = new ArrayList<>();

    // Encrypt method
    public static String encrypt(String text, int shift) {
        StringBuilder result = new StringBuilder();
        for (char character : text.toCharArray()) {
            if (Character.isUpperCase(character)) {
                char ch = (char) (((int) character + shift - 65) % 26 + 65);
                result.append(ch);
            } else if (Character.isLowerCase(character)) {
                char ch = (char) (((int) character + shift - 97) % 26 + 97);
                result.append(ch);
            } else {
                result.append(character); // leave non-letters unchanged
            }
        }
        return result.toString();
    }

    // Decrypt method
    public static String decrypt(String text, int shift) {
        // reverse shift for decryption
        return encrypt(text, 26 - (shift % 26));
    }

    // Show operation history
    public static void showHistory() {
        if (history.isEmpty()) {
            System.out.println("\n📜 No history yet!");
        } else {
            System.out.println("\n📜 History of operations:");
            for (int i = 0; i < history.size(); i++) {
                System.out.println((i + 1) + ". " + history.get(i));
            }
        }
    }

    // Main program loop
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            // Display menu
            System.out.println("\nChoose an option:");
            System.out.println("1. Encrypt a message");
            System.out.println("2. Decrypt a message");
            System.out.println("3. View history");
            System.out.println("4. Exit");

            System.out.print("Enter choice: ");
            int option = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (option) {
                case 1:
                    System.out.print("Enter your message: ");
                    String messageE = scanner.nextLine();

                    System.out.print("Enter shift value (number): ");
                    int shiftE = scanner.nextInt();
                    scanner.nextLine();

                    String encrypted = encrypt(messageE, shiftE);
                    System.out.println("🔒 Encrypted message: " + encrypted);

                    history.add("[Encrypt] \"" + messageE + "\" → \"" + encrypted + "\" (Shift: " + shiftE + ")");
                    break;

                case 2:
                    System.out.print("Enter your message: ");
                    String messageD = scanner.nextLine();

                    System.out.print("Enter shift value (number): ");
                    int shiftD = scanner.nextInt();
                    scanner.nextLine();

                    String decrypted = decrypt(messageD, shiftD);
                    System.out.println("🔓 Decrypted message: " + decrypted);

                    history.add("[Decrypt] \"" + messageD + "\" → \"" + decrypted + "\" (Shift: " + shiftD + ")");
                    break;

                case 3:
                    showHistory();
                    break;

                case 4:
                    running = false;
                    System.out.println("👋 Exiting program. Goodbye!");
                    break;

                default:
                    System.out.println("❌ Invalid choice, try again.");
                    break;
            }
        }

        scanner.close();
    }
}
