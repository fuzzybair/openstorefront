package edu.usu.sdl.openstorefront.web.action.test;

import edu.usu.sdl.openstorefront.service.ServiceProxy;
import edu.usu.sdl.openstorefront.web.action.BaseAction;
import edu.usu.sdl.openstorefront.web.test.BaseTestCase;
import edu.usu.sdl.openstorefront.web.test.TestSuiteModel;
import java.util.List;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;

/**
 * This base class of Service Container tests
 *
 * @author dshurtleff
 */
public abstract class BaseTestAction
		extends BaseAction
{

	private class TestResults
	{

		private final StringBuilder content;
		private final int failTestCount;
		private final int testCount;
		private final long time;

		public TestResults(StringBuilder content, int failTestCount, int testCount, long time)
		{
			this.content = content;
			this.failTestCount = failTestCount;
			this.testCount = testCount;
			this.time = time;
		}

		public StringBuilder getContent()
		{
			return content;
		}

		public int getFailTestCount()
		{
			return failTestCount;
		}

		public int getTestCount()
		{
			return testCount;
		}

		public long getTime()
		{
			return time;
		}

	}

	private boolean summary;
	private boolean useRest;
	private String user;
	/**
	 * format is html or xml (JUnit test results)
	 * https://www.ibm.com/support/knowledgecenter/en/SSQ2R2_9.5.0/com.ibm.rsar.analysis.codereview.cobol.doc/topics/cac_useresults_junit.html
	 */
	private String format = "html";

	protected ServiceProxy testServiceProxy()
	{
		return new ServiceProxy();
	}

	protected Resolution printAndSendReport(List<TestSuiteModel> testSuiteModels)
	{
		StringBuilder output = printReport(testSuiteModels);
		return sendReport(output.toString());
	}

	protected StringBuilder printReport(List<TestSuiteModel> testSuiteModels)
	{
		StringBuilder output = new StringBuilder();
		StringBuilder testCasses = new StringBuilder();
		int failTestCount = 0;
		int testCount = 0;
		long time = 0;

		if (format.equalsIgnoreCase("xml")) {
			for (TestSuiteModel testSuiteModel : testSuiteModels) {
				TestResults results = printXmlReport(testSuiteModel);
				failTestCount += results.getFailTestCount();
				testCount += results.getTestCount();
				time += results.getTime();
				testCasses.append(results.getContent());
			}
			output.append("<testsuites id='ContainerTests' name='Container Tests ")
					.append("timestamp")
					.append("' tests='")
					.append(testCount)
					.append("' failures='")
					.append(failTestCount)
					.append("' time='")
					.append(time / 1000.0)
					.append("'>")
					.append(testCasses)
					.append("</testsuites>");
		} else {

			for (TestSuiteModel testSuiteModel : testSuiteModels) {
				TestResults results = printHtmlReport(testSuiteModel);

				failTestCount += results.getFailTestCount();
				testCount += results.getTestCount();
				time += results.getTime();
				testCasses.append(results.getContent());
			}
			
			output.append("<div class='test-suite ")
					.append(failTestCount == 0 ? "passed" : (failTestCount == testCount) ? "failed" : "")
					.append("'>")
					.append("<h1>Total Results</h1>")
					.append("<div class='test-suite-stat'>")
					.append("Total: ").append(testCount).append(" ")
					.append("Success: <span class='result passed'>").append(testCount - failTestCount).append("</span> ")
					.append("Fail: <span class='result failed'>").append(failTestCount).append("</span>  ")
					.append("Run Time:  ").append(time / 1000.0).append("s  ")
					.append("</div>")
					.append("<div class='test-list'>")
					.append(testCasses)
					.append("</div></div>");
		}
		return output;
	}

	protected StringBuilder printReport(TestSuiteModel testSuiteModel)
	{
		if (format.equalsIgnoreCase("xml")) {
			TestResults results = printXmlReport(testSuiteModel);
			return new StringBuilder().append("<?xml version='1.0' encoding='UTF-8'?><testsuites id='")
					.append(testSuiteModel.getName().replace(" ", ""))
					.append("' name='Container Tests ")
					.append("timestamp_here")
					.append("' tests='")
					.append(results.getTestCount())
					.append("' failures='")
					.append(results.getFailTestCount())
					.append("'>")
					.append(results.getContent())
					.append("</testsuites>");
		} else {
			return printHtmlReport(testSuiteModel).getContent();
		}
	}

	private TestResults printXmlReport(TestSuiteModel testSuiteModel)
	{
		StringBuilder testsuite = new StringBuilder();
		int failTestCount = 0;
		int testCount = 0;
		StringBuilder testCase = new StringBuilder();
		for (BaseTestCase test : testSuiteModel.getTests()) {
			testCount++;
			testCase.append("\n<testcase id='contaierTests.")
					.append(testSuiteModel.getName().replace(" ", ""))
					.append(".")
					.append(test.getDescription().replace(" ", ""))
					.append("' name='")
					.append(test.getDescription())
					//					.append("' time='")
					//					.append(test.getTime() / 1000.0)
					.append("'>");
			if (test.isSuccess() == false) {
				testCase.append("\n<failure message='")
						.append(test.getResults().toString().replace("<br>", ""))
						.append("'>")
						.append(test.getFailureReason().toString().replace("<br>", "\n").replace(">", "&gt;").replace("<", "&lt;"))
						.append("</failure>");
				failTestCount++;
			}
			testCase.append("</testcase>");
		}

		testsuite.append("\n<testsuite id='contaierTests.")
				.append(testSuiteModel.getName().replace(" ", ""))
				.append("' name='")
				.append(testSuiteModel.getName())
				.append("' tests='")
				.append(testCount)
				.append("' failures='")
				.append(failTestCount)
				.append("' time='")
				.append(testSuiteModel.getRunTimeInMills() / 1000.0)
				.append("'>");
		testsuite.append(testCase);
		testsuite.append("</testsuite>");

		return new TestResults(testsuite, failTestCount, testCount, testSuiteModel.getRunTimeInMills());
	}

	private TestResults printHtmlReport(TestSuiteModel testSuiteModel)
	{
		StringBuilder output = new StringBuilder();
		int failTestCount = 0;
		int testCount = 0;
		if (summary) {
			for (BaseTestCase test : testSuiteModel.getTests()) {
				String passed = "<span style='color: green'> PASSED </span>";
				if (test.isSuccess() == false) {
					passed = "<span style='color: red'> FAILED </span>";
				}

				output.append("Test: <b>").append(test.getDescription()).append("</b>...").append(passed).append(" <br>");
			}
		} else {
			StringBuilder testCase = new StringBuilder();
			for (BaseTestCase test : testSuiteModel.getTests()) {
				testCount++;
				testCase.append("<div class='test-case ").append(test.isSuccess() ? "passed" : "failed").append("'>");
				String passed = "<span class='result passed'> PASSED </span>";
				if (test.isSuccess() == false) {
					passed = "<span class='result failed'> FAILED </span>";
				}

				testCase.append("<div class='heading'>Test: <span class='description'>").append(test.getDescription()).append("</span>").append(passed).append("</div>");

				//results or failure
				testCase.append("<div class='output'>Output: <br><br>");
				testCase.append(test.getResults());
				if (test.isSuccess() == false) {
					testCase.append("<br>Failure Reason: <br>");
					testCase.append(test.getFailureReason());
					failTestCount++;
				}
				testCase.append("</div></div>");
			}

			output.append("<div class='test-suite ").append(failTestCount == 0 ? "passed" : (failTestCount == testCount) ? "failed" : "").append("'>");
			output.append("<h2>").append(testSuiteModel.getName()).append("</h2>");
			output.append("<div class='test-list'>");
			output.append(testCase);
			output.append("<div class='test-suite-stat'>").append(testSuiteModel.statString()).append("</div></div></div>");
		}

		return new TestResults(output, failTestCount, testCount, testSuiteModel.getRunTimeInMills());
	}

	protected Resolution sendReport(String reportData)
	{
		return new StreamingResolution(format.equalsIgnoreCase("xml") ? "text/xml" : "text/html", reportData);
	}

	public String getFormat()
	{
		return format;
	}

	public void setFormat(String format)
	{
		this.format = format;
	}

	public boolean getSummary()
	{
		return summary;
	}

	public void setSummary(boolean summary)
	{
		this.summary = summary;
	}

	public boolean isUseRest()
	{
		return useRest;
	}

	public void setUseRest(boolean useRest)
	{
		this.useRest = useRest;
	}

	public String getUser()
	{
		return user;
	}

	public void setUser(String user)
	{
		this.user = user;
	}

}
