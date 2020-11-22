package src.main.java.calculator;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CalculatorController {
	
	@RequestMapping("/percent")
	public String percent(@RequestParam(name = "operand") double operand) {
		return (operand/100.0)+"";
	}
	
	
	@RequestMapping("/inverse")
	public String inverse(@RequestParam(name = "operand") double operand) {
		if (operand!= 0)
			return (1/operand) + "";
		return "E";
	}
	
	@RequestMapping("/square")
	public String square(@RequestParam(name = "operand") double operand) {
		return (operand*operand)+"";
	}
	
	@RequestMapping("/squareRoot")
	public String squareRoot(@RequestParam(name = "operand") double operand) {
		if (operand >= 0) {
			return Math.sqrt(operand) + "";
		} else {
			return "E";
		}
	}
	
	@RequestMapping("/divide")
	public String divide(@RequestParam(name = "firstOperand") double firstOperand, @RequestParam(name = "secondOperand") double secondOperand) {
		if (secondOperand == 0)
			return "E";
		return (BigDecimal.valueOf(firstOperand/secondOperand)) +"";
	}
	
	@RequestMapping("/multiply")
	public String multiply(@RequestParam(name = "firstOperand") double firstOperand, @RequestParam(name = "secondOperand") double secondOperand) {
		return (BigDecimal.valueOf(firstOperand*secondOperand)) + "";
	}
	
	@RequestMapping("/addition")
	public String addition(@RequestParam(name = "firstOperand") double firstOperand, @RequestParam(name = "secondOperand") double secondOperand) {
		return (BigDecimal.valueOf(firstOperand).add(BigDecimal.valueOf(secondOperand))) + "";
	}
	
	@RequestMapping("/subtraction")
	public String subtraction(@RequestParam(name = "firstOperand") double firstOperand, @RequestParam(name = "secondOperand") double secondOperand) {
		return (BigDecimal.valueOf(firstOperand).subtract(BigDecimal.valueOf(secondOperand))) + "";
	}
}
