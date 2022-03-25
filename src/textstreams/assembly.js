import {
  randomLineRepeatedString,
  randomInteger,
  randomItemFromArray,
} from "../utils";

const stream =
  "nopw   0x0(%rax,%rax,1)\nlea    0x8587(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7358\nnopl   0x0(%rax)\nretq\nnopl   0x0(%rax)\nmov    0xd8b1(%rip),%rbp\nmov    %rbp,%rdi\nlea    0x889c(%rip),%rsi\ncallq  1170\npop    %rbp\nmov    %rax,0xd052(%rip)\nretq\nnop\nlea    0x8874(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7d24\nnopl   0x0(%rax)\nlea    0x8848(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7ceb\nnopl   0x0(%rax)\nlea    0x8812(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7cb2\nnopl   0x0(%rax)\nlea    0x87e2(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7c79\nnopl   0x0(%rax)\nlea    0x87b0(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7c40\nnopl   0x0(%rax)\nlea    0x877f(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7c07\nnopl   0x0(%rax)\nlea    0x8751(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7bce\nnopl   0x0(%rax)\nlea    0x8721(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7b95\nnopl   0x0(%rax)\nlea    0x86ee(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7b5c\nnopl   0x0(%rax)\nlea    0x86be(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7b23\nnopl   0x0(%rax)\nlea    0x8693(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7aea\nnopl   0x0(%rax)\nlea    0x8669(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7ab1\nnopl   0x0(%rax)\nlea    0x863d(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7a78\nnopl   0x0(%rax)\nlea    0x860b(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7a3f\nnopl   0x0(%rax)\nlea    0x85db(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7a06\nnopl   0x0(%rax)\nlea    0x85a9(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   79cd\nnopl   0x0(%rax)\nlea    0xa481(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7994\nnopl   0x0(%rax)\nlea    0xa449(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   795b\nnopl   0x0(%rax)\nlea    0x854c(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7922\nnopl   0x0(%rax)\nlea    0xa3f9(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   78e9\nnopl   0x0(%rax)\nlea    0x850d(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   78b0\nnopl   0x0(%rax)\nlea    0x84e0(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7877\nnopl   0x0(%rax)\nlea    0x84b3(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   783e\nnopl   0x0(%rax)\nlea    0x8486(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7805\nnopl   0x0(%rax)\nlea    0x8459(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   77cc\nnopl   0x0(%rax)\nlea    0x842c(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7793\nnopl   0x0(%rax)\nlea    0x83ff(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   775a\nnopl   0x0(%rax)\nlea    0x83d4(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7721\nnopl   0x0(%rax)\nlea    0x83a9(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   76e8\nnopl   0x0(%rax)\nlea    0x837e(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   76af\nnopl   0x0(%rax)\nlea    0x8359(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7676\nnopl   0x0(%rax)\nlea    0x8334(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   763d\nnopl   0x0(%rax)\nlea    0x830f(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7604\nnopl   0x0(%rax)\nlea    0x82ea(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   75cb\nnopl   0x0(%rax)\nlea    0x82c6(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7592\nnopl   0x0(%rax)\nlea    0x82a2(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7559\nnopl   0x0(%rax)\nlea    0x827e(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7520\nnopl   0x0(%rax)\nlea    0x825a(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   74e7\nnopl   0x0(%rax)\nlea    0x822b(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   74ae\nnopl   0x0(%rax)\nlea    0x81fe(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7475\nnopl   0x0(%rax)\nlea    0x81d1(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   743c\nnopl   0x0(%rax)\nlea    0x81ac(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7403\nnopl   0x0(%rax)\nlea    0x817b(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   73ca\nnopl   0x0(%rax)\nlea    0x8152(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   7391\nxor    %eax,%eax\njmpq   a5eb\nxor    %eax,%eax\njmpq   a5eb\nxor    %eax,%eax\njmpq   993a\nxor    %eax,%eax\njmpq   9a57\nxor    %eax,%eax\njmpq   a482\nxor    %eax,%eax\njmpq   a06d\nxor    %eax,%eax\njmpq   a89e\nnopl   0x0(%rax)\nlea    0x4dde(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c8b9\nnopl   0x0(%rax)\nlea    0x4db9(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c880\nnopl   0x0(%rax)\nlea    0x4d96(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c847\nnopl   0x0(%rax)\nlea    0x4d71(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c80e\nnopl   0x0(%rax)\nlea    0x4d49(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c7d5\nnopl   0x0(%rax)\nlea    0x4d24(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c79c\nnopl   0x0(%rax)\nlea    0x4cf8(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c763\nnopl   0x0(%rax)\nlea    0x4ccd(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c72a\nnopl   0x0(%rax)\nlea    0x4ca8(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c6f1\nnopl   0x0(%rax)\nlea    0x4c85(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c6b8\nnopl   0x0(%rax)\nlea    0x4c60(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c67f\nnopl   0x0(%rax)\nlea    0x4c3e(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c646\nnopl   0x0(%rax)\nlea    0x4c16(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c60d\nnopl   0x0(%rax)\nlea    0x4bf1(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c5d4\nnopl   0x0(%rax)\nmov    0x80a9(%rip),%rbp\nlea    0x4bc2(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c586\nnopl   0x0(%rax,%rax,1)\nlea    0x4b9c(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c554\nnopl   0x0(%rax)\nlea    0x4b71(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c51b\nnopl   0x0(%rax)\nlea    0x4b47(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c4e2\nnopl   0x0(%rax)\nlea    0x4b1c(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c4a9\nnopl   0x0(%rax)\nlea    0x4af2(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c470\nnopl   0x0(%rax)\nlea    0x4ac6(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\njmpq   c437\nnopl   0x0(%rax)\nlea    0x4a9c(%rip),%rsi\nmov    %rbp,%rdi\ncallq  1170\n";

const assembly = {
  numCols: 25,
  zIndex: 0,
  get streams() {
    return [
      {
        get title() {
          delete this.title;
          const titles = ["Assembly", "Disassembler", "ASM", "Objdump -d"];
          return (this.title = randomItemFromArray(titles));
        },

        get stream() {
          delete this.stream;
          return (this.stream = randomLineRepeatedString(stream));
        },

        get dt() {
          delete this.dt;
          return (this.dt = randomInteger(30, 30 * 5));
        },
      },
    ];
  },
};

export default assembly;
